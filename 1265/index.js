const
  blessed   = require('blessed'),
  screen    = blessed.screen();

screen.render();
screen.on('keypress', function(ch, key){
  console.log(JSON.stringify(key));
});
