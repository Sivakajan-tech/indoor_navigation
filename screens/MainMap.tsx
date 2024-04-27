import React, {useState, useEffect,useMemo} from 'react';
import WifiReborn from 'react-native-wifi-reborn';
import {getLocationPrediction} from '../navigation/test'
import {graphJsonString} from '../navigation/constants';
import {getWifiStrengths} from '../navigation/wifiRefinedInputUtil'

import {View, Image, StyleSheet, PanResponder,Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 64;


const MainMap = () => {
   const [markerPosition, setMarkerPosition] = useState({x: 0, y: 0});
   const [zoomLevel, setZoomLevel] = useState(1);

   const graphJsonInput = useMemo(() => {
      setMarkerPosition({x: windowWidth / 2, y: windowHeight / 2});
      return JSON.parse(graphJsonString);
    }, []);

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
        wifiStringName = [];
        try {
          const nodeData = graphJsonInput?.nodes?.find(node => {
            return node.id === gidId;
          })?.data;
          setMarkerPosition({
            x: (nodeData.x + 1) * 50,
            y: (nodeData.y + 1) * 50,
          });
        } catch (e) {
          console.log(e);
        }
      };
  
      getPredictedGrid();
  
      const interval = setInterval(() => {
        getPredictedGrid();
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);

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
            source={require('../assets/FloorPlan.jpg')}
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
      backgroundColor: '#FFD1E3',
   },
   mapImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
   },
   marker: {
      width: 15,
      height: 15,
      borderRadius: 10,
      backgroundColor: 'red',
      position: 'absolute',
   },
});

export default MainMap;
