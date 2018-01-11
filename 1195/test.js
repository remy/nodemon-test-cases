const express = require('express');
const crypto = require('crypto');
const fs = require('fs-extra');
const MongoClient = require('mongodb').MongoClient;
const zlib = require('zlib');

const app = express();

var counter;
var best_network_hash = null;
var best_network_mtimeMs = 0;
var last_match_sent_ts = Date.now();
var db;

// TODO Make a map to store pending match info, use mapReduce to find who to serve out, only
// delete when SPRT fail or needed games have all arrived?
//
var pending_matches = [];

function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex');
}

//  db.matches.aggregate( [ { "$redact": { "$cond": [ { "$gt": [ "$number_to_play", "$game_count" ] }, "$$KEEP", "$$PRUNE" ] } } ] )
async function get_pending_matches() {
  return new Promise((resolve, reject) => {
    db
      .collection('matches')
      .aggregate([
        {
          $redact: {
            $cond: [
              { $gt: ['$number_to_play', '$game_count'] },
              '$$KEEP',
              '$$PRUNE',
            ],
          },
        },
      ])
      .sort({ _id: -1 })
      .forEach(
        match => {
          // Client only accepts strings for now
          Object.keys(match.options).map(key => {
            match.options[key] = String(match.options[key]);
          });

          // If SPRT=pass use unshift() instead of push() so "elo only" matches go last in priority
          //
          switch (SPRT(match.network1_wins, match.network1_losses)) {
            case false:
              //console.log("SPRT: Skipping a bad network: " + JSON.stringify(match));
              break;
            case true:
              pending_matches.unshift(match);
              console.log('SPRT: Unshifting: ' + JSON.stringify(match));
              break;
            default:
              pending_matches.push(match);
              console.log('SPRT: Pushing: ' + JSON.stringify(match));
          }
        },
        err => {
          if (err) {
            console.error('Error fetching matches: ' + err);
            return reject(err);
          }
        }
      );

    resolve();
  });
}

async function get_best_network_hash() {
  return new Promise((resolve, reject) => {
    // Check if file has changed. If not, send casched version instead.
    //
    fs.stat(__dirname + '/network/best-network.gz', (err, stats) => {
      if (err) return reject(err);

      if (!best_network_hash || best_network_mtimeMs != stats.mtimeMs) {
        //console.log("Not cached");
        fs.readFile(__dirname + '/network/best-network.gz', (err, data) => {
          if (err) {
            console.error('Error opening best-network.gz: ' + err);
            return reject(err);
          }

          var networkbuffer = Buffer.from(data);

          zlib.unzip(networkbuffer, (err, networkbuffer) => {
            if (err) {
              console.error('Error decompressing best-network.gz: ' + err);
              return reject(err);
            } else {
              var network = networkbuffer.toString();
              best_network_hash = checksum(network, 'sha256');
              best_network_mtimeMs = stats.mtimeMs;
              resolve(best_network_hash);
            }
          });
        });
      } else {
        resolve(best_network_hash);
      }
    });
  });
}

//SPRT
//
function LL(x) {
  return 1 / (1 + 10 ** (-x / 400));
}

function LLR(W, L, elo0, elo1) {
  //if (W==0 || L==0) return 0;
  if (!W) W = 1;
  if (!L) L = 1;

  var N = W + L;
  var w = W / N;
  var s = w;
  var m2 = w;
  var variance = m2 - s ** 2;
  var variance_s = variance / N;
  var s0 = LL(elo0);
  var s1 = LL(elo1);

  return (s1 - s0) * (2 * s - s0 - s1) / variance_s / 2.0;
}

//function SPRT(W,L,elo0,elo1)
function SPRT(W, L) {
  var elo0 = 0,
    elo1 = 35;
  var alpha = 0.05,
    beta = 0.05;

  var LLR_ = LLR(W, L, elo0, elo1);
  var LA = Math.log(beta / (1 - alpha));
  var LB = Math.log((1 - beta) / alpha);

  //console.log(LLR_ + " " + LA + " " + LB);

  if (LLR_ > LB) {
    return true;
  } else if (LLR_ < LA) {
    return false;
  } else {
    return null;
  }
}

// This is async but we don't need it to start the server. I'm calling it during startup so it'll get the value cached right away
// instead of when the first /best-network request comes in, in case a lot of those requests come in at once when server
// starts up.
get_best_network_hash().then(hash => console.log('Current best hash ' + hash));

// I thought about setting timers for each request sent and removing the timers as games come back, Map'ed by
// random seed perhaps, but it may be good enough to just refresh the pending list if we're idle on match
// submissions for a while.
//

setInterval(() => {
  //console.log("Interval check!");

  var now = Date.now();

  if (!pending_matches.length && now > last_match_sent_ts + 1000 * 60 * 15) {
    console.log(
      'No matches sent in 15 minutes and list empty. Updating pending list.'
    );

    last_match_sent_ts = now;

    get_pending_matches()
      .then()
      .catch();
  }
}, 1000 * 60 * 1);

MongoClient.connect('mongodb://localhost/test', (err, database) => {
  if (err) return console.log(err);

  db = database;

  db
    .collection('networks')
    .count()
    .then(count => {
      console.log(count + ' networks.');
    });

  db.collection('networks').aggregate(
    [
      {
        $group: {
          _id: null,
          total: { $sum: '$game_count' },
        },
      },
    ],
    (err, res) => {
      if (err) console.log(err);

      //get_pending_matches()
      //.then()
      //.catch();

      //console.log("I got back " + res[0].total + " from " + JSON.stringify(res, null, 4));
      counter = (res[0] || { total: 0 }).total;

      console.log('ok');
      console.log(counter + ' games.');

      app.listen(8081, () => {
        console.log('listening on 8081');
      });
    }
  );

  /*
    db.collection("games").count()
    .then((count) => {
        counter = count;
        console.log ( count + " games.");

        app.listen(8080, () => {
            console.log('listening on 8080')
        })
    });
*/
});
