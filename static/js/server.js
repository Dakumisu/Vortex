var fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../sound/samples/beats');

fs.readdir(directoryPath, function (err, files) {
   if (err) {
        return console.log('Unable to scan directory: ' + err);
   } 

   files.forEach(function (file) {
      console.log(file); 
   });
});
