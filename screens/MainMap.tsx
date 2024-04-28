import React, { useState, useEffect, useMemo } from 'react';
import WifiReborn from 'react-native-wifi-reborn';
import { getLocationPrediction } from '../navigation/GetLocationPrediction'
import { getWifiStrengths } from '../navigation/wifiRefinedInputUtil'
import { accelerometer } from 'react-native-sensors';
import { Provider } from  'react-native-paper';
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { View, Image, StyleSheet, Dimensions, Pressable, Text, Share } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import {navigableOptions} from '../navigation/constants';


setUpdateIntervalForType(SensorTypes.accelerometer, 100);
setUpdateIntervalForType(SensorTypes.gyroscope, 100);


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MainMap = () => {
   const [circles, setCircles] = useState([]);

   const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
   const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

   const addCircle = (event) => {
      const [x, y] = [event.nativeEvent.locationX, event.nativeEvent.locationY];
      const newCircle = { x, y };
      setCircles([...circles, newCircle]);
   };


   const shareInput = (gridID) => () => {
      Share.share({
         message: "pocketpath://mainmap?gridID=" + gridID,
      });
   };

   const resetCircle = () => {
      setCircles([]);
      setDropDownStartValue(0);
   };

   useEffect(() => {
      const accelerometerSubscription = accelerometer.subscribe(({ x, y, z }) => {
         setAccelerometerData({ x, y, z });
      });

      return () => {
         accelerometerSubscription.unsubscribe();
      };
   }, []);

   useEffect(() => {
      const accelerometerX = accelerometerData.x;
      const accelerometerY = accelerometerData.y;

      // Adjust pointer position based on accelerometer data
      const newX = pointerPosition.x + accelerometerX * 0.1; // Adjust the multiplier as needed
      const newY = pointerPosition.y + accelerometerY * 0.1;

      const boundedX = Math.min(Math.max(newX, 0), windowWidth);
      const boundedY = Math.min(Math.max(newY, 0), windowHeight);

      setPointerPosition({ x: boundedX, y: boundedY });
   }, [accelerometerData]);

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

   const [dropDownStartValue, setDropDownStartValue] = useState(0);

   const [gridID, setgridID] = useState(87);
   const [horizontalLength, verticalLength] = calculateGridNumber(gridID);
   const [horizontalLength2, verticalLength2] = calculateGridNumber(dropDownStartValue);
   const topOutterMap = 76;
   const mapTopMargin = 20;
   const mapLeftMargin = 18;

   const [showDropDownStart, setShowDropDownStart] = useState(false);
   
   let markerPosition = [mapLeftMargin + verticalLength+5, topOutterMap + mapTopMargin + horizontalLength+5] ;
   let destMarkerPosition = [mapLeftMargin + verticalLength2+5, topOutterMap + mapTopMargin + horizontalLength2+5] ;
  
   const [zoomLevel, setZoomLevel] = useState(1);

   useEffect(() => {
      const getPredictedGrid = async () => {
         let wifiStringName = [];
         const wifiList = await WifiReborn?.loadWifiList();

         wifiList?.map(wifi => {
            let wifiData = '';
            wifiData += wifi.BSSID;
            wifiData += '=';
            wifiData += wifi.SSID;
            wifiData += '=';
            wifiData += wifi.level;
            wifiStringName.push(wifiData);
         });

         const currentWifiStrengths = getWifiStrengths(wifiStringName);
         const gidId = await getLocationPrediction(currentWifiStrengths);
         setgridID(gidId);
         wifiStringName = [];

      };

      getPredictedGrid();

      const interval = setInterval(() => {
        getPredictedGrid();
      }, 3000);
  
      return () => clearInterval(interval);
   }, []);


   return (
      <Provider>
      <View style={styles.container}>
         <View style={{ position: 'absolute', top:12,left:15, zIndex:1, width:'60%'}} >
            <DropDown 
               label={'Select Destination'}
               mode={'outlined'}
               visible={showDropDownStart}
               showDropDown={() => setShowDropDownStart(true)}
               onDismiss={() => setShowDropDownStart(false)}
               value={dropDownStartValue}
               setValue={setDropDownStartValue}
               list={navigableOptions}
            />
         </View>
         <View style={{ position: 'absolute', top:12,right:2}} >
            <Pressable onPress={shareInput(gridID)} style={styles.shareButton}>
               <Text style={styles.shareText}>Share</Text>
            </Pressable>
            <Pressable onPress={resetCircle} style={styles.resetButton}>
               <Text style={styles.resetText}>Reset</Text>
            </Pressable>
         </View>
         <Pressable onPress={(evt) => addCircle(evt)} style={styles.mapImage}>
            <Image
               source={require('../assets/FloorPlan.jpg')}
               style={[styles.mapImage, { transform: [{ scale: zoomLevel }] }]}
               resizeMode="contain"
            />
         </Pressable>
         {
            circles.map((circle, index) => (
               <View
                  key={index}
                  style={[
                     styles.circle,
                     { left: circle.x, top: circle.y },
                  ]}
               />
            ))
         }
         <View
            style={[
               styles.marker,
               { left: markerPosition[0], top: markerPosition[1] },
            ]}
         />
         {dropDownStartValue!=0 ? (
          <View
          style={[
             styles.marker2,
             { left: destMarkerPosition[0], top: destMarkerPosition[1] },
          ]}
       />
        ) : null}

         
      </View >
      </Provider>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFD1E3',
   },
   resetButton: {
      position: 'absolute',
      top: 20,
      right: 10,
      padding: 8,
      backgroundColor: 'lightblue',
      borderRadius: 5,
      marginTop: -10,
      zIndex: 1,
   },
   resetText: {
      fontSize: 15,
      color: 'white',
   },
   mapImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
   },
   circle: {
      width: 15,
      height: 15,
      borderRadius: 10,
      borderColor: 'black',
      position: 'absolute',
      backgroundColor: 'lightgreen',
   },
   marker: {
      width: 5,
      height: 5,
      borderRadius: 10,
      backgroundColor: 'red',
      position: 'absolute',
   },

   marker2: {
      width: 15,
      height: 15,
      borderRadius: 10,
      backgroundColor: 'blue',
      position: 'absolute',
   },
   shareButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      padding: 8,
      backgroundColor: 'lightgreen',
      borderRadius: 5,
      zIndex: 1,
      marginEnd:50,
      marginVertical:-10
   },
   shareText: {
      fontSize: 15,
      color: 'white',
   },
});

export default MainMap;
