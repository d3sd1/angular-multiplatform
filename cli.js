#!/usr/bin/env node
// This file handles global invocation only.
//let command = require('./scripts/')

var rimraf = require("rimraf");
var pjson = require('./package.json');
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

const execSync = require('child_process').execSync;
console.log(execSync('pwd').toString());
let installTypeGlobal = true;

try {
  command = require(`${process.cwd()}/node_modules/angular-multiplatform`);
  installTypeGlobal = false;
} catch (e) {
  // Ignorable =)
}

if (!installTypeGlobal) {
  console.error("angular-multiplatform needs to be installed only as a global dependency.");
  console.error("Fixing error...");
  execSync('npm uninstall --save angular-multiplatform');
  execSync('npm i --save -g angular-multiplatform@latest');
  rimraf.sync("./node_modules/angular-multiplatform");
  console.error("Error fixed!");
  //TODO: volver a correr comando (con los argumentos etc.) y cerrar este proceso.
}

// Check version and update to last if needed
const lastVersion = execSync('npm show angular-multiplatform version').toString();
const currentVersion = pjson.version;
if(pjson.version.toString().trim() !== lastVersion.trim()) {
  console.error("New version detected! Updating to version " + lastVersion + "...");
  execSync('npm i --save -g angular-multiplatform@latest');
  //TODO: volver a correr comando (con los argumentos etc.) y cerrar este proceso.
} else {
  console.error("Running latest version. Great! (v: " + currentVersion + ")");
}
try {
  const ngBuildOutput = execSync('ng build').toString();
  if(ngBuildOutput.indexOf("The build command requires to be run in an Angular project") !== -1) {
    console.log("angular-multiplatform needs to be runned inside an angular project. Please, move to the project root path and re-execute command.");
    process.exit();
  }
} catch(e) {

}


//TODO: usar colorines output consola
//TODO: liberar librerias de este proyecto y escribir manual basico de inicio
//TODO: cuando se pase un argumento (p.e. --platform=ios) se ejecute el siguiente codigo
/*


// BOOT IOS
const execSync = require('child_process').execSync;


// Get iOS device ID
const devices = execSync('xcrun simctl list devices').toString();
const iosDevices = devices.substring(
  devices.indexOf("-- iOS ") + 1,
  devices.indexOf("-- tvOS")
);
const iosDeviceID = iosDevices.substring(
  iosDevices.indexOf("(") + 1,
  iosDevices.indexOf(")")
);

try {
  execSync('xcrun simctl boot ' + iosDeviceID).toString();
} catch (e) {
  // If it shoes message booted, ignore exception. Either, show.
  if (e.toString().indexOf('Unable to boot device in current state: Booted') === -1) {
    console.error("Unhandled exception during iOS boot: " + e);
  }
}

execSync('xcrun simctl install "' + iosDeviceID + '" ' +
  '"./platforms/ios/build/emulator/OnRiot.app"').toString();
execSync('xcrun simctl shutdown "' + iosDeviceID + '"').toString();
execSync('xcrun simctl boot "' + iosDeviceID + '"').toString();
execSync('open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app').toString();
execSync('xcrun simctl launch booted "com.onriot.app"').toString();

    "store:build:ios": "npm run web:kernel:compile:prod && cordova build --release ios",
 */
