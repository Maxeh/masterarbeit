## Description
Platform-independent app created with Flutter.

## Install

1) Install the Flutter SDK according to the offical docs (https://flutter.io/get-started/install/).
2) Install the newest version of Android Studio.
3) Add flutter/bin to the PATH variable on Windows.
4) Run flutter_console.bat in the Flutter folder and run the command "flutter doctor" to get further information on what to do next.
5) Make sure you have Git installed.
6) Open your IDE (e.g. Android Studio) and install the plugins "Dart" and "Flutter".
7) Open the project in your IDE.
8) Get the project's dependencies.
9) In the project folder "flutter/android" create a file called "key.properties" with the following content:
```
storePassword=xxx
keyPassword=xxx
keyAlias=xxx
storeFile=xxx
```
You don't need to put real values in there, when you just create a debug version of the app. If you want to create a release version later on, you have to fill in your keystore information.

10) Connect a smarthphone or start an emulator and run the project with your IDE (green triangle).

## Run on iOS

The app was not configured for iOS during development. With some adjustments the app should also work on iOS.
