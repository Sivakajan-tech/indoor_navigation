import React from 'react';
import {
   View,
   Text,
   Button,
   Image,
   StyleSheet,
   Dimensions,
   TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Welcome: React.FC = ({navigation}) => {
   const handleWelcomeButtonClick = () => {
      navigation.navigate('MainMap');
   };

   const handleLoginButtonClick = () => {
      navigation.navigate('AdminLogin');
   };

   return (
      <View style={styles.container}>
         <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginButtonClick}>
            <Text style={styles.loginButtonText}>Admin</Text>
         </TouchableOpacity>
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
                  color="#e6a881"
                  title="Let's start"
                  onPress={handleWelcomeButtonClick}
               />
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#9d54bf',
      position: 'relative',
   },
   loginButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
   },
   loginButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      backgroundColor: '#9d54bf',
   },
   imageContainer: {
      flex: 1,
      paddingTop: 60,
   },
   image: {
      width: windowWidth,
      height: windowHeight * 0.5,
      resizeMode: 'cover',
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
