#!/usr/bin/env node
// This file handles global invocation only.
//let command = require('./scripts/')

var rimraf = require('rimraf');
var pjson = require('./package.json');
var confClass = require('./scripts/config');
var conf = confClass.getConfig();


const execSync = require('child_process').execSync;
const util = require('util');
const projectPath = execSync('pwd').toString();
const exec = util.promisify(require('child_process').exec);

execSync('ng config -g cli.warnings.versionMismatch false').toString();

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
if (pjson.version.toString().trim() !== lastVersion.trim()) {
  console.error("New version detected! Updating to version " + lastVersion + "...");
  execSync('npm i --save -g angular-multiplatform@latest');
  //TODO: volver a correr comando (con los argumentos etc.) y cerrar este proceso.
} else {
  console.error("Running latest version. Great! (v: " + currentVersion + ")");
}
try {
  const ngBuildOutput = execSync('ng build').toString();
  if (ngBuildOutput.indexOf("The build command requires to be run in an Angular project") !== -1) {
    console.log("angular-multiplatform needs to be runned inside an angular project. Please, move to the project root path and re-execute command.");
    process.exit();
  }
} catch (e) {

}


//TODO: usar colorines output consola
//TODO: liberar librerias de este proyecto y escribir manual basico de inicio
//TODO: cuando se pase un argumento (p.e. --platform=ios) se ejecute el siguiente codigo

process.argv.forEach(function (command, num, array) {
  if (command.indexOf('--') !== -1) {
    const com = command.split('=');
    if (com[0].toString().toLowerCase() === '--platform' && com[1].toString().toLowerCase() === 'ios') {


      console.log("Building iOS app!");
      //TODO: node scripts/fixproject.js &&

      console.log("Compiling Angular...");

      async function buildIos() {
        const { stdout, stderr } = await exec('ng build --configuration=production --aot=true --prod --buildOptimizer=true --optimization=true');

        if (stderr) {
          console.error(`error: ${stderr}`);
        }
        console.log(`Number of files ${stdout}`);

        console.log("Compiling iOS...");

        const { stdout2, stderr2 } = await exec('(cordova platform add ios || true) && (cordova build ios || true)');

        if (stderr2) {
          console.error(`error: ${stderr2}`);
        }
        console.log(`Number of files ${stdout2}`);

        const devices = execSync('xcrun simctl list devices').toString();
        console.log(devices);
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

        const { openEmu, openEmuErr } = await exec('open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app');
        const { launchApp, launchAppErr } = await exec('xcrun simctl launch booted "com.onriot.app"');

      }
      buildIos();

    }
  }
});
