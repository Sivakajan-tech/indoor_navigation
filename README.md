# PocketPath

## Introduction
PocketPath is a smartphone-based indoor navigation solution, designed to provide users with convenience and user-friendly navigation within complex and large indoor environments.  With the help of this app, users can easily search for their destination within the building, locating both their destination and their current position. Additionally, users can choose to share their current position with others via a provided link, enriching the app's functionality and enhancing user engagement. This app utilizes Wi-Fi fingerprinting, IMU sensors, and a Machine Learning Model, ensuring highly accurate indoor location tracking.

## How to Setup the Environment

### Pre-requisite
1. Ensure that your machine has JDK installed, version 17 to 20. This is a mandatory requirement.
2. Install an emulator. Android Studio provides a convenient option.
3. Install an IDE (Integrated Development Environment) suitable for React Native development.
4. Verify that you have set the `$ANDROID_HOME` and `$JAVA_HOME` environment variables before starting the application. You can check this by running `echo $ANDROID_HOME`, which should return a path like `'/Users/sivakajan/Library/Android/sdk'` on macOS.

### Getting Started

1. Clone the Repository.
```
git clone https://github.com/Sivakajan-tech/indoor_navigation.git
```
2. Navigate into the cloned repository directory.
```
cd indoor_navigation
```

3. Install all the necessary packages by running:
```
npm install
```
   
4. Start the React Native bundler by running
```
npx react-native start
```
You can now proceed with building and running the application on your emulator or connected device using your preferred IDE.

### Lint Checker.
You need to ensure the `npm run lint` does not have any errors or warnings. You can easily omit this by running `npx eslint --fix .`

## Contributors
- [Tharsha Sivapalarajah](https://github.com/Tharsha-Sivapalarajah) <br>
- [Sivakajan Sivaparan](https://github.com/sivakajan-tech) <br>
- [Shanmugavadivel Gopinath](https://github.com/shangopi) <br>
