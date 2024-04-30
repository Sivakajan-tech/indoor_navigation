import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const AdminUpdate: React.FC = ({navigation}) => {
   const handleAdminCreateButtonClick = () => {
      navigation.navigate('AdminDashboard');
   };

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Update Reference Points</Text>
         <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Grid ID</Text>
            <View style={styles.inputBox}>
               <TextInput
                  style={styles.input}
                  placeholder="Enter the Grid ID..."
               />
            </View>
         </View>
         <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Point Name</Text>
            <View style={styles.inputBox}>
               <TextInput
                  style={styles.input}
                  placeholder="Enter the name of the reference point..."
               />
            </View>
         </View>
         <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contact Number</Text>
            <View style={styles.inputBox}>
               <TextInput
                  style={styles.input}
                  placeholder="Enter the contact number..."
               />
            </View>
         </View>
         <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Operating Hours</Text>
            <View style={styles.inputBox}>
               <TextInput
                  style={styles.input}
                  placeholder="Enter the operating hours..."
               />
            </View>
         </View>
         <TouchableOpacity style={styles.button} onPress={handleAdminCreateButtonClick}>
            <Text style={styles.buttonText}>UPDATE</Text>
         </TouchableOpacity>
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
   title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 30,
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
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
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

export default AdminUpdate;
