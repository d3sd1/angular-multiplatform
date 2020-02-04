.. Angular-MultiPlatform documentation master file, created by
   sphinx-quickstart on Fri Jan 10 18:32:47 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

*****
Build From Windows
*****
This tutorial is intended only for Windows host users (users that run this code on Windows, but they want apps for the world!).


Common steps
=================================================
* You must have installed npm as a global command (with node). You must follow this `website tutorial <https://nodejs.org/es/download/>`_ if you run **node -v** on a terminal
and there's no command found.|
* You ran **npm i** on the project root.


Local test for desktop apps
***********
The app will run the same independent from the operating system.|
You can test it with:|
**npm run desktop:dev**


Build from Windows for Windows
***********
Run the command:|
**npm run desktop:build:windows**|
You will get two types of compilation:|
* Packed: .exe file. Ready for distribute. You can get it in the folder ./release.|
* Unpacked: Binaries, with all libraries and the .exe. You can get it inside ./release/win-unpacked



Build from Windows for Linux
***********

**npm run desktop:build:linux**

There is an electron error with dial connect. As soon as they fix it, I will update this docs.


Build from Windows for MacOS
***********

You can't natively. You have to run it on a MacOS virtual machine nor a pc with MacOS as host operating system, due to
Apple restrictions.


Build from Windows for iOS
***********

You can't natively. You have to run it on a MacOS virtual machine nor a pc with MacOS as host operating system, due to
Apple restrictions.


Build from Windows for Android
***********

Prerequisites:|
* Cordova installed. You can do it executing **npm install -g cordova && cordova telemetry on**. If you type **cordova --version** it should throw the version.|
* Java 8 (must be 8!) installed (and added to path). You can install it with chocolatey(more info about `chocolatey openjdk8 <https://chocolatey.org/packages/openjdk>`_): **choco install openjdk8**.|
* Have an androiid platform on Cordova, by running **cordova platform add android**|
* ADB tools installed. You can install it with Android Studio and following this tutorial after the IDE install.|
* Set up ANDROID_SDK_ROOT to C:\Users\%USERNAME%\AppData\Local\Android\Sdk, JAVA_HOME and PATH variables. You must to it by yourself, there are many good tutorials on the network.|
* Gradle installed. You can do it with **choco install gradle**
* Accept Android SDK licenses with the command **%ANDROID_SDK_ROOT%/tools/bin/sdkmanager --licenses**|
* If you just ran above commands, please, restart terminal nor IDE.|

**npm run desktop:build:android**|


Build to Markets
***********

Prerequisites:|
You must have followed the commands from Build for Android and Build for iOS.

Play Store (Android):|
**npm run store:build:android**

App Store (iOS):|
You can't build iOS from Windows.
