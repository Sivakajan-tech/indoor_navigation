const {SSIDS} = require('./data');

const dataset = SSIDS
  
  export function getWifiStrengths(inputData) {
    console.log(inputData.length);
    const orderedList = [];
    const signalStrength = [];
    for (let i = 0; i < dataset.length; i++) {
      let x = 0;
      for (let j = 0; j < inputData.length; j++) {
        let str = inputData[j].split('=');
        if (dataset[i] === str[0]) {
          x = 1;
          orderedList.push(str[0]);
          signalStrength.push(parseFloat(str[2]));
        }
      }
      if (x == 0) {
        signalStrength.push(0.0);
      }
    }
    console.log('Ordered list:', orderedList);
    console.log('Signal Strength list:', signalStrength);
    return signalStrength;
  }
  