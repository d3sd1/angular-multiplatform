const fs = require('fs');
const configFile = './.ngmult.json';
module.exports = {
  getConfig: function () {
    try {
      if (fs.existsSync(configFile)) {
        return require(configFile);
      }
    } catch(err) {
      console.error(err);
      fs.writeFile('newfile.txt', 'Learn Node FS module', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      });
      return require(configFile);
    }
  },
};
function createConfigFile() {

}
