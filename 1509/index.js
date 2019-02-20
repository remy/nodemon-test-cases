const fs = require( 'fs' );

var originalNote = {
  title: 'Some title',
  body: 'Some body'
};

var originalNoteString = JSON.stringify( originalNote );
fs.writeFileSync( 'notes.json', originalNoteString );
