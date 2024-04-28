const KNN = require('ml-knn');
const {test_labels, test_data} = require('./data');

async function getLocationPrediction(currentWifiStrengths) {
  try {
    const sizel = test_data.length;
    
    const train_data_set = test_data;

    var knn = new KNN(train_data_set, test_labels, {k: 2}); // consider 2 nearest neighbors

    var ans = knn.predict(currentWifiStrengths);
    console.log('ans =', ans);
    return ans;
  } catch (e) {
    console.log('Error', e);
  }
}

getLocationPrediction();
module.exports = {getLocationPrediction};
