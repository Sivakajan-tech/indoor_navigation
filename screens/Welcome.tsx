import React from 'react';
import {View, Text, Button, Image, StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Welcome: React.FC = () => {
   return (
      <View style={styles.container}>
         <View style={styles.imageContainer}>
            <Image
               source={require('../assets/GPS-navigation-apps-2.png')}
               style={styles.image}
            />
         </View>
         <View style={styles.contentContainer}>
            <Text style={styles.title}>Find your way, wherever you are.</Text>
            <Text style={styles.description}>
               Our indoor navigation app helps you navigate complex indoor
               spaces with ease.
            </Text>
            <View style={styles.styleLoginBtn}>
               <Button
                  color="#e6a881" //button colorx
                  title="Let's start"
               />
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#9d54bf', // Change to your desired purple color
   },
   imageContainer: {
      flex: 1,
      paddingTop: 60,
   },
   image: {
      width: windowWidth,
      height: windowHeight * 0.5, // Adjust image height as needed
      resizeMode: 'cover', // Resize image to fit container
   },
   contentContainer: {
      position: 'absolute',
      bottom: 10,
      padding: 20,
   },
   title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
      textAlign: 'center',
   },
   description: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 30,
      textAlign: 'center',
   },
   styleLoginBtn: {
      marginTop: 30,
      marginLeft: 50,
      marginRight: 50,
      borderWidth: 2,
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 10,
   },
});

export default Welcome;
