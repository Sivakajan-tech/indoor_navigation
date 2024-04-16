import React, {useState} from 'react';
import {View, Image, StyleSheet, PanResponder} from 'react-native';

const MainMap = () => {
   const [markerPosition, setMarkerPosition] = useState({x: 0, y: 0});
   const [zoomLevel, setZoomLevel] = useState(1);

   const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
         // Handle panning
         setMarkerPosition({
            x: markerPosition.x + gesture.dx,
            y: markerPosition.y + gesture.dy,
         });

         // Handle pinch gesture for zooming
         if (gesture.state === PanResponder.STATE_CHANGED && gesture.pinch) {
            const newZoomLevel = zoomLevel * gesture.pinch;
            // Enforce zoom limits (optional)
            setZoomLevel(Math.max(1, Math.min(3, newZoomLevel))); // Limit zoom between 1x and 3x
         }
      },
   });

   return (
      <View style={styles.container}>
         <Image
            source={require('../assets/GPS-navigation-apps-2.png')}
            style={[styles.mapImage, {transform: [{scale: zoomLevel}]}]}
            resizeMode="contain"
         />
         {/* Draggable Marker */}
         <View
            style={[
               styles.marker,
               {left: markerPosition.x, top: markerPosition.y},
            ]}
            {...panResponder.panHandlers}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   mapImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
   },
   marker: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'red',
      position: 'absolute',
   },
});

export default MainMap;
