var fs = require('fs');
var kernel = require('./kernel');
const indexFile = kernel.getProjectPath() + '/src/index.html';
fs.readFile(indexFile, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/<base href="\/">/g, '<base href="">')
    .replace(/<base href="\.">/g, '<base href="">');

  fs.writeFile(indexFile, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
