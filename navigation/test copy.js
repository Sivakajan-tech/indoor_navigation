const KNN = require('ml-knn');
const {test_labels, test_data} = require('./data');

// import {weight_height} from'./data.js';

const noOfCols = 40;
const colStart = 3;

const indexes = [
  2, 4, 10, 11, 12, 13, 14, 15, 23, 24, 26, 28, 30, 37, 38, 45, 46,
];

async function getLocationPrediction(currentWifiStrengths) {
  try {
    const sizel = test_data.length;

    const train_data_set = indexes.map(index => test_data[index]);
    console.log(
      'train_data_set =',
      indexes.map(index => currentWifiStrengths[index]),
    );
    // .slice(3, size)
    // .map(item => item.slice(colStart, noOfCols));
    const train_data_labels = indexes.map(index => test_labels[index]);
    // .map(item => item.slice(colStart, noOfCols));

    // const test_data_set = test_data
    //   .slice(colStart, 3)
    //   .map(item => item.slice(colStart, noOfCols));

    // const test_data_labels = test_labels.slice(colStart, 3);

    var knn = new KNN(train_data_set, train_data_labels, {k: 5}); // consider 2 nearest neighbors

    var ans = knn.predict(indexes.map(index => currentWifiStrengths[index]));
    console.log('ans =', ans);
    return ans;
  } catch (e) {
    console.log('Error', e);
  }
}

getLocationPrediction();
module.exports = {getLocationPrediction};

// classification result:
// ans = [ 0, 0, 1, 1 ]
// Based on the training data, the first two points of the test dataset are classified as "0" (type 0, perhaps),
// the third and fourth data points are classified as "1".
