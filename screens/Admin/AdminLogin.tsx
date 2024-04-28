import React, { useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Dimensions, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackHandler } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const AdminLogin: React.FC = ({ navigation }) => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const handleLogin = () => {
      // Check username and password here (you can replace this with your authentication logic)
      if (username === 'admin' && password === 'admin123') {
         navigation.navigate('AdminDashboard');
      } else {
         Alert.alert(
            'Error',
            'Invalid username or password',
            [
               { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
         );
      }
   };

   const handleNavigateHome = () => {
      setIsMenuOpen(false);
      Alert.alert(
         'Confirm',
         'Are you sure you want to Return to the Home Page ?',
         [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => navigation.navigate('Welcome') },
         ],
         { cancelable: false }
      );
   };

   const handleExitApp = () => {
      setIsMenuOpen(false);
      Alert.alert(
         'Confirm',
         'Are you sure you want to Exit the Application ?',
         [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
         ],
         { cancelable: false }
      );
   };

   return (
      <View style={styles.container}>
         <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuOpen(!isMenuOpen)}>
               <Text style={styles.menuButtonText}>Menu</Text>
            </TouchableOpacity>
            {isMenuOpen && (
               <View style={styles.menu}>
                  <TouchableOpacity style={styles.menuOption} onPress={handleNavigateHome}>
                     <Text style={styles.menuOptionText}>Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuOption} onPress={handleExitApp}>
                     <Text style={styles.menuOptionText}>Exit</Text>
                  </TouchableOpacity>
               </View>
            )}
         </View>
         <Text style={styles.title}>Admin Login</Text>
         <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username</Text>
            <View style={styles.inputBox}>
               <TextInput
                  style={styles.input}
                  placeholder="Enter your Username Here..."
                  onChangeText={setUsername}
                  value={username}
               />
            </View>
         </View>
         <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputBox}>
               <TextInput
                  style={styles.input}
                  placeholder="Enter your Password Here..."
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry
               />
            </View>
         </View>
         <TouchableWithoutFeedback onPress={handleLogin}>
            <View style={styles.button}>
               <Text style={styles.buttonText}>LOGIN</Text>
            </View>
         </TouchableWithoutFeedback>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9d54bf',
      padding: 20,
   },
   menuContainer: {
      position: 'absolute',
      top: 20,
      right: 30,
   },
   menuButton: {
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      zIndex: 1,
   },
   menuButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
   },
   menu: {
      position: 'absolute',
      top: 40,
      right: 0,
      backgroundColor: '#fff',
      borderRadius: 10,
      zIndex: 1,
   },
   menuOption: {
      flexDirection: 'row',
      padding: 10,
   },
   menuOptionText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
   },
   title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 50,
      marginTop: -20,
   },
   inputContainer: {
      marginBottom: 20,
      width: windowWidth * 0.8,
   },
   inputLabel: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
   },
   inputBox: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#fff',
      backgroundColor: '#fff',
      marginBottom: 25,
   },
   input: {
      width: '100%',
      height: 50,
      paddingHorizontal: 20,
      fontSize: 15,
      fontWeight: 'bold',
      color: '#000000',
   },
   button: {
      width: windowWidth * 0.5,
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
   },
   buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#9d54bf',
   },
});

export default AdminLogin;
