const dataset = [
    '00:b0:e1:99:44:c0',
    '00:b0:e1:99:44:c1',
    '00:b0:e1:99:44:ce',
    '00:b0:e1:99:44:cf',
    '18:8b:45:11:e2:4e',
    '18:8b:45:11:e2:4f',
    '64:a6:51:22:f9:40',
    '84:f1:47:3b:56:ee',
    '84:f1:47:3b:56:ef',
    'a4:6c:2a:b9:54:21',
    'a4:b2:39:0e:b3:a0',
    'a4:b2:39:0e:b3:a1',
    'a4:b2:39:0e:b3:ae',
    'a4:b2:39:0e:b3:af',
    'a4:b2:39:0e:b4:40',
    'a4:b2:39:0e:b4:41',
    'a4:b2:39:0e:b4:4e',
    'a4:b2:39:0e:b4:4f',
    'a4:b2:39:0e:d1:60',
    'a4:b2:39:0e:d1:61',
    'a4:b2:39:0e:d1:6e',
    'a4:b2:39:0e:d1:6f',
    'a4:b2:39:13:56:a0',
    'a4:b2:39:13:56:ae',
    'a4:b2:39:13:56:af',
    'a4:b2:39:13:57:40',
    'f4:7f:35:76:d7:30',
    'f4:7f:35:76:d7:31',
    'f4:7f:35:76:d7:3f',
    'f4:7f:35:98:82:a0',
    'f4:7f:35:98:82:a1',
    'f4:7f:35:51:36:91',
    'f4:7f:35:76:d7:3e',
    '18:8b:45:11:e2:40',
    '18:8b:45:11:e2:41',
    'a4:b2:39:13:57:41',
    'a4:b2:39:0e:da:0e',
    'a4:b2:39:0e:da:0f',
    'a4:b2:39:13:49:0e',
    'a4:b2:39:13:49:0f',
    'f4:7f:35:5f:fe:b1',
    'f4:7f:35:98:82:af',
    '84:f1:47:3b:56:e1',
    '28:52:61:ca:67:d0',
    'a4:6c:2a:b9:54:20',
    'a4:b2:39:0e:d6:c0',
    'a4:b2:39:13:56:a1',
    'f4:7f:35:98:82:ae',
    '18:8b:45:11:d6:60',
    '18:8b:45:11:d6:61',
    '18:8b:45:11:d6:6e',
    '84:f1:47:3b:56:e0',
    'a4:b2:39:0e:8b:00',
    'a4:b2:39:13:49:00',
    'a4:b2:39:13:49:01',
    'f4:7f:35:5f:fe:b0',
    '28:52:61:ca:67:d1',
    'f4:7f:35:85:be:61',
    'f8:d1:11:ad:c3:92',
    '04:5f:b9:fc:72:c0',
    'a4:b2:39:13:4f:6e',
    'a4:b2:39:13:4f:6f',
    'f4:7f:35:51:36:90',
    '18:8b:45:11:d6:6f',
    '6c:71:0d:f1:a7:20',
    '6c:71:0d:f1:a7:21',
    'a4:b2:39:13:4f:61',
    '04:5f:b9:fc:72:ce',
    'a4:b2:39:13:4f:60',
    'f4:7f:35:51:36:9f',
    'a4:b2:39:0e:da:00',
    'a4:b2:39:0e:da:01',
    '04:5f:b9:fc:72:cf',
    'a4:b2:39:0e:d6:ce',
    'a4:b2:39:0e:d6:c1',
    'a4:b2:39:0e:8b:01',
    'f4:7f:35:51:36:9e',
    'a4:b2:39:13:48:60',
    'a4:b2:39:0e:d6:a1',
    'a4:b2:39:0e:8b:0e',
    'a4:b2:39:0e:8b:0f',
    'a4:6c:2a:b9:54:2f',
    '6c:71:0d:f1:a7:2e',
    '6c:71:0d:f1:a7:2f',
    'a4:b2:39:0e:d6:cf',
    '04:5f:b9:fc:72:c1',
    'a4:6c:2a:b9:54:2e',
    '00:6b:f1:a3:66:20',
    'f4:7f:35:85:be:60',
    'a4:b2:39:0e:d6:a0',
    'a4:b2:39:13:48:61',
    '28:52:61:ca:67:10',
    '28:52:61:ca:67:11',
    '00:6b:f1:a3:66:21',
  ];
  
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
  