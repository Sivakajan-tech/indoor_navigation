import {View} from 'react-native';
import React, {useEffect, useRef} from 'react';

import recordData from './recordDataService';
import {ActivityIndicator} from 'react-native-paper';
export default function DataCollector({setDataCollected}) {
   const recorderRef = useRef(null);
   useEffect(() => {
      //effect
      console.log('Started recording readings');
      recorderRef.current = setInterval(async () => {
         const recordedData = await recordData();
         console.log('Recorded data', recordedData);
         setDataCollected(pre => [...pre, recordedData]);
      }, 2000);
      return () => {
         clearInterval(recorderRef.current);
      };
   }, [setDataCollected]);
   return (
      <View>
         <ActivityIndicator size="small" color="tomato" />
      </View>
   );
}
