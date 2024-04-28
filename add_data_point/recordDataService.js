import WifiReborn from 'react-native-wifi-reborn';
import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid} from 'react-native';
// import determineLocation from '../services/locationService';

async function recordData() {
   try {
      const granted = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
         {
            title: 'Location permission is required for WiFi connections',
            message:
               'This app needs location permission as this is required  ' +
               'to scan for wifi networks.',
            buttonNegative: 'DENY',
            buttonPositive: 'ALLOW',
         },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         // Get the current WiFi signal strength
         const wifiList = await WifiReborn?.loadWifiList();

         const signalStrengths = wifiList?.map(wifi => {
            return {[`${wifi.BSSID}=${wifi.SSID}`]: wifi.level};
         });

         // Get the current location
         // const loc = await determineLocation();

         //TODO:Get IMU data

         return {signalStrengths};
      } else {
         // Permission denied
      }
   } catch (error) {
      console.error(error);
   }
}

export default recordData;

// Function to save data to database
export async function saveDataToDatabase(gridNo, data) {
   try {
      const recTifiedData = data
         .filter(d => d?.signalStrengths?.length > 0)
         .map(d => {
            return {
               gridNo: gridNo,
               // lat: d?.loc?.latitude,
               // long: d?.loc?.longitude,
               wifi: d?.signalStrengths,
            };
         });

      const wifiStringMaker = wifi => {
         let wifiString = '';
         wifi.forEach(w => {
            const key = Object.keys(w)[0];
            const value = w[key];
            wifiString += `${key}=${value},`;
         });
         return wifiString;
      };

      // construct csvString
      const headerString = 'grid,wifi\n';
      const rowString = recTifiedData
         .map(d => `${gridNo},${wifiStringMaker(d?.wifi)}\n`)
         .join('');
      const csvString = `${headerString}${rowString}`;

      // write the current list of answers to a local csv file
      const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/indoornav/data.csv`;
      console.log('pathToWrite', pathToWrite);
      // pathToWrite /storage/emulated/0/Download/data.csv
      RNFetchBlob.fs
         .appendFile(pathToWrite, csvString, 'utf8')
         // .writeFile(pathToWrite, csvString, 'utf8')
         .then(() => {
            console.log(`wrote file ${pathToWrite}`);
            // wrote file /storage/emulated/0/Download/data.csv
         })
         .catch(error => console.error(error));

      console.log('Data saved to database', recTifiedData);
   } catch (error) {
      console.error(error);
   }
}
