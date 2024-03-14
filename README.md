# How to setup the envirnment
### Prerequisites
1. Ensure that your machine has JDK installed, version 17 to 20. This is a mandatory requirement.
2. Install an emulator. Android Studio provides a convenient option.
3. Install an IDE (Integrated Development Environment) suitable for React Native development.
4. Verify that you have set the `$ANDROID_HOME` and `$JAVA_HOME` environment variables before starting the application. You can check this by running `echo $ANDROID_HOME`, which should return a path like `'/Users/sivakajan/Library/Android/sdk'` on macOS.

### Guid step by step

1. Clone the repository.
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


## Contribute

### Lint Checker.
You need to ensure the `npm run lint` does not have any errors or warnings. You can easily omit this by running `npx eslint --fix`

## Contributors
* Sivakajan Sivaparan
* Tharsha Sivapalarajah
* Shanmugavadivel Gopinath
