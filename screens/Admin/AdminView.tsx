import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const AdminView: React.FC = () => {
   return (
      <View style={styles.container}>
         <Image
            source={require('../../assets/FloorPlan.jpg')}
            style={[styles.mapImage]}
            resizeMode="contain"
         />
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
   mapImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
   },
});

export default AdminView;
