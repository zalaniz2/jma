# jma

<strong>Jazz Theory Application (JMA)</strong>

JMA is a user friendly application made in Node.js that connects to a MIDI controller (i.e. keyboard) and takes users 
through exercises based around jazz theory. Each exercise tracks active notes, correct/incorrect notes, as well as
time it took to finish and accuracy. Exercise and note information is pulled from a Mongo database using AJAX, and users
can complete each exercises using any octave on the keyboard. Notes are being recieved using Web MIDI API, 
which allows for input to be recieved through the browser.

Examples of exercises include practicing seventh chords, types of scales (i.e. blues), and chord progressions to
popular jazz standards.

Built w/ Node.js, MongoDB, Javascript, Web MIDI API.
