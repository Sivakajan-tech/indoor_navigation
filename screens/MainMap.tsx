import React, {useState, useEffect,useMemo} from 'react';
import WifiReborn from 'react-native-wifi-reborn';
import {getLocationPrediction} from '../navigation/GetLocationPrediction'
import {graphJsonString} from '../navigation/constants';
import {getWifiStrengths} from '../navigation/wifiRefinedInputUtil'
import { accelerometer, gyroscope } from 'react-native-sensors';
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

setUpdateIntervalForType(SensorTypes.accelerometer, 100);
setUpdateIntervalForType(SensorTypes.gyroscope, 100);

import {View, Image, StyleSheet, PanResponder,Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 64;

const MainMap = () => {
   const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

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

    // Limit pointer position within screen bounds
    const screenWidth = 300; // Adjust according to your screen width
    const screenHeight = 500; // Adjust according to your screen height
    const boundedX = Math.min(Math.max(newX, 0), screenWidth);
    const boundedY = Math.min(Math.max(newY, 0), screenHeight);

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

   const [gridID, setgridID] = useState(87);
   const [horizontalLength, verticalLength] = calculateGridNumber(gridID);
   const topOutterMap = 42;
   const mapTopMargin = 31;
   const mapLeftMargin = 20;
   
   let markerPosition = [mapLeftMargin + verticalLength + 8, topOutterMap + mapTopMargin + horizontalLength + 8] ;
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
      }, 15000);
  
      return () => clearInterval(interval);
    }, []);


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
               { left: markerPosition[0], top: markerPosition[1] },
            ]}
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
