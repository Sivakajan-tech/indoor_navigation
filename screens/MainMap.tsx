import React, { useState } from 'react';
import { View, Image, StyleSheet, PanResponder } from 'react-native';

const MainMap = () => {
   const calculateGridNumber = (squareId: number) => {
      const rows = 37; // Number of rows
      const columns = 21; // Number of columns
      const squareSize = 17; // Size of each square

      // Get the row position (1-based)
      const row = Math.ceil(squareId / columns);

      // Calculate horizontal length (distance from top left corner)
      const horizontalLength = (rows - row) * squareSize;
      const verticalLength = (squareId % columns === 0) ? (columns - 1) * 10 : ((squareId % columns) - 1) * squareSize;

      // Return both horizontalLength and verticalLength as an array
      return [horizontalLength, verticalLength];
   };

   // Call the function
   const [horizontalLength, verticalLength] = calculateGridNumber(568);
   const topOutterMap = 42;
   const mapTopMargin = 31;
   const mapLeftMargin = 20;
   
   const [markerPosition, setMarkerPosition] = useState({ x: mapLeftMargin + verticalLength + 8, y: topOutterMap + mapTopMargin + horizontalLength + 8 });
   const [zoomLevel, setZoomLevel] = useState(1);

   const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
         console.log('Gesture:', gesture);
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
            source={require('../assets/FloorPlan.jpg')}
            style={[styles.mapImage, { transform: [{ scale: zoomLevel }] }]}
            resizeMode="contain"
         />
         {/* Draggable Marker */}
         <View
            style={[
               styles.marker,
               { left: markerPosition.x, top: markerPosition.y },
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
      backgroundColor: '#FFD1E3',
   },
   mapImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
   },
   marker: {
      width: 5,
      height: 5,
      borderRadius: 10,
      backgroundColor: 'red',
      position: 'absolute',
   },
});

export default MainMap;
