import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {BackHandler} from 'react-native';

const AdminDashboard: React.FC = ({navigation}) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const handleCreateReferencePoint = () => {
      navigation.navigate('AdminCreate');
   };

   const handleViewReferencePoints = () => {
      navigation.navigate('AdminView');
   };

   const handleDeleteReferencePoints = () => {
      navigation.navigate('AdminDelete');
   };

   const handleUpdateReferencePoints = () => {
      navigation.navigate('AdminUpdate');
   };

   const handleAddDataPoints = () => {
      navigation.navigate('DataCollectorScreen');
   };

   const handleNavigateHome = () => {
      setIsMenuOpen(false);
      Alert.alert(
         'Confirm',
         'Are you sure you want to Return to the Home Page ?',
         [
            {
               text: 'Cancel',
               onPress: () => console.log('Cancel Pressed'),
               style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.navigate('Welcome')},
         ],
         {cancelable: false},
      );
   };

   const handleExitApp = () => {
      setIsMenuOpen(false);
      Alert.alert(
         'Confirm',
         'Are you sure you want to Exit the Application ?',
         [
            {
               text: 'Cancel',
               onPress: () => console.log('Cancel Pressed'),
               style: 'cancel',
            },
            {text: 'OK', onPress: () => BackHandler.exitApp()},
         ],
         {cancelable: false},
      );
   };

   return (
      <View style={styles.container}>
         <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsMenuOpen(!isMenuOpen)}>
            <Text style={styles.menuButtonText}>Menu</Text>
         </TouchableOpacity>
         {isMenuOpen && (
            <View style={styles.menu}>
               <TouchableOpacity
                  style={styles.menuOption}
                  onPress={handleNavigateHome}>
                  <Text style={styles.menuOptionText}>Home</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.menuOption}
                  onPress={handleExitApp}>
                  <Text style={styles.menuOptionText}>Exit</Text>
               </TouchableOpacity>
            </View>
         )}
         <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Hello Admin !!!</Text>
            <Text style={styles.descriptionText}>
               Welcome to Indoor Navigation App :-)
            </Text>
            <Text style={styles.descriptionText}>
               Feel Free to Modify the App !!
            </Text>
         </View>
         <TouchableOpacity
            style={styles.option}
            onPress={handleCreateReferencePoint}>
            <Text style={styles.optionText}>Create Reference Point</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.option}
            onPress={handleViewReferencePoints}>
            <Text style={styles.optionText}>View Reference Points</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.option}
            onPress={handleDeleteReferencePoints}>
            <Text style={styles.optionText}>Delete Reference Points</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.option}
            onPress={handleUpdateReferencePoints}>
            <Text style={styles.optionText}>Update Reference Points</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.option} onPress={handleAddDataPoints}>
            <Text style={styles.optionText}>Add Data Points</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#9d54bf',
      padding: 20,
   },
   menuButton: {
      position: 'absolute',
      top: 20,
      right: 20,
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
      top: 60,
      right: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      zIndex: 1,
   },
   menuOption: {
      padding: 10,
   },
   menuOptionText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
   },
   welcomeContainer: {
      marginBottom: 50,
      alignItems: 'flex-start',
   },
   welcomeText: {
      fontSize: 50,
      fontWeight: 'bold',
      marginTop: 70,
      marginBottom: 50,
      color: '#000000',
   },
   descriptionText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#000000',
   },
   option: {
      padding: 8,
      backgroundColor: '#fff',
      marginTop: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
   },
   optionText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
   },
});

export default AdminDashboard;
