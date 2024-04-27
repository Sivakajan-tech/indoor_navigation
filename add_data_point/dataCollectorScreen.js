import {
   View,
   Text,
   ScrollView,
   TouchableOpacity,
   StyleSheet,
   Dimensions,
} from 'react-native';
import React from 'react';

import {ActivityIndicator, DataTable, TextInput} from 'react-native-paper';

import DataCollector from './dataCollector';
import {saveDataToDatabase} from './recordDataService';
const windowWidth = Dimensions.get('window').width;

export default function IMUScreen({route}) {
   const [dataCollected, setDataCollected] = React.useState([]);
   const [grid, setGrid] = React.useState(null);
   const [isStarted, setIsStarted] = React.useState(false);
   const [isSaving, setIsSaving] = React.useState(false);
   const startRecordings = () => {
      setIsStarted(pre => true);
   };

   const stopRecording = () => {
      console.log('Stopping recording');
      setIsStarted(pre => false);
   };
   const saveRecordings = async () => {
      console.log('Saving recording');
      setIsSaving(pre => true);
      await saveDataToDatabase(grid, dataCollected);
      setIsSaving(pre => false);
      setDataCollected(pre => []);

      console.log('Recordings saved');
   };

   return (
      <View style={styles.container}>
         <View>
            <Text style={styles.title}>Navigation</Text>
         </View>
         <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
               <TextInput
                  style={styles.input}
                  placeholder="Add grid number"
                  value={grid}
                  onChangeText={text => setGrid(text)}
               />
            </View>
         </View>
         <View style={styles.innerPage}>
            {/* <ScrollView horizontal> */}
            <Text style={styles.descriptionText}>
               Number of Data collected: {JSON.stringify(dataCollected.length)}
            </Text>
            <View>
               {!isStarted ? (
                  <>
                     <TouchableOpacity
                        style={styles.button}
                        onPress={startRecordings}>
                        <Text style={styles.buttonText}>START</Text>
                     </TouchableOpacity>
                     {dataCollected.length > 0 && grid !== null && (
                        <TouchableOpacity
                           style={styles.button}
                           onPress={saveRecordings}>
                           <Text style={styles.buttonText}>SAVE</Text>
                        </TouchableOpacity>
                     )}
                  </>
               ) : (
                  <TouchableOpacity
                     style={styles.button}
                     onPress={stopRecording}>
                     <Text style={styles.buttonText}>STOP</Text>
                  </TouchableOpacity>
               )}
            </View>
            {isStarted ? (
               <Text style={styles.descriptionText}>Reading...</Text>
            ) : isSaving ? (
               <Text style={styles.descriptionText}>Saving...</Text>
            ) : (
               <Text style={styles.descriptionText}>Waiting to start...</Text>
            )}
            {isSaving && (
               <View>
                  <ActivityIndicator size="small" color="green" />
               </View>
            )}
            {isStarted ? (
               <DataCollector setDataCollected={setDataCollected} />
            ) : null}

            <DataTable style={styles.dataTable}>
               <DataTable.Header>
                  <DataTable.Title>
                     <Text style={styles.wifiText}>Point</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric>
                     <Text style={styles.wifiText}>WiFi</Text>
                  </DataTable.Title>
                  {/* <DataTable.Title numeric>
              <Text style={{color: '#fff'}}>Lat</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{color: '#fff'}}>Long</Text>
            </DataTable.Title> */}
               </DataTable.Header>
               <ScrollView>
                  {dataCollected?.reverse().map((reading, idx) => (
                     <DataTable.Row key={idx}>
                        <DataTable.Cell>
                           <Text style={styles.wifiText}>{idx}</Text>
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                           <Text style={styles.wifiText}>
                              {' '}
                              {JSON.stringify(reading?.signalStrengths)}
                           </Text>
                        </DataTable.Cell>
                        {/* <DataTable.Cell numeric>
                <Text style={{color: '#fff'}}>{reading?.loc?.latitude}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{color: '#fff'}}>{reading?.loc?.longitude}</Text>
              </DataTable.Cell> */}
                     </DataTable.Row>
                  ))}
               </ScrollView>
            </DataTable>

            {/* </ScrollView> */}

            {/* {data.map((reading, idx) => (
          <Text >{reading}</Text>
        ))} */}
         </View>
      </View>
   );
}

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
      marginTop: 150,
      marginBottom: 10,
   },
   inputContainer: {
      marginBottom: 20,
      width: windowWidth * 0.8,
   },
   inputLabel: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 2,
   },
   inputBox: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#fff',
      backgroundColor: '#fff',
   },
   descriptionText: {
      fontSize: 20,
      marginTop: 10,
      color: '#fff',
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
   wifiText: {
      color: '#fff',
   },
   dataTable: {
      height: 500,
   },
   innerPage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
   },
});
