var fs = require('fs'),
    path = require('path'),
    colors = require('colors');

exports.IonicBower = {

  setIonicVersion: function(newVersion) {
    var bowerData = this.getData();
    if(!bowerData.devDependencies) bowerData.devDependencies = {};
    bowerData.devDependencies.ionic = 'driftyco/ionic-bower#' + newVersion;
    this.saveData(bowerData);
  },

  setAppName: function(newAppName) {
    var bowerData = this.getData();
    bowerData.name = newAppName;
    this.saveData(bowerData);
  },

  getData: function() {
    var bowerFilePath = path.resolve('bower.json');

    try {
      if( fs.existsSync(bowerFilePath) ) {
        return require(bowerFilePath);
      }
    } catch(e){}

    return {
      "name": "HelloIonic",
      "private": "true"
    };
  },

  saveData: function(bowerData) {
    try {
      var bowerFilePath = path.resolve('bower.json');
      fs.writeFileSync( bowerFilePath, JSON.stringify(bowerData, null, 2) );
    } catch(e) {
      console.log( ('Error saving ' + bowerFilePath + ': ' + e).error.bold );
    }
  }

};
