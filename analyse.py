from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
import numpy as np


f = open(r"C:\Users\shang\OneDrive\Desktop\data.csv", "r")
output = f.read().split("\n")
wifis = []
for i in output:
    if  len(i)>0 and i[0].isnumeric() : wifis.append(i)

grids = []
wifi_string = []


for i in wifis:
    temp = i.split(',')
    grids.append(temp.pop(0))
    wifi_string.append(temp)

ssid = {}

for i in wifi_string:
    for j in i:
        if j!='': 
            curr_ssid = j.split('=')[0]
            if curr_ssid in ssid:
                ssid[curr_ssid] +=1
            else :
                ssid[curr_ssid] =1
ssid = {k: v for k, v in sorted(ssid.items(), key=lambda item: item[1])}
ssids = {}
i=0
for j in ssid:
    if(ssid[j]>70): 
        ssids[j] = i
        i+=1 

cols_size = len(ssids)

x_data = []
for i in range(len(grids)):
    x_data.append([0]*cols_size)
    
for i in range(len(wifi_string)):
    for j in wifi_string[i]:
        if j!='':
            temp = j.split('=')
            curr_ssid = temp[0]
            if curr_ssid in ssids:
                power = temp[2]
                index = ssids[curr_ssid]
                x_data[i][index] = int(power)

# Convert Python lists to JavaScript arrays
test_data = '[' + ','.join(map(str, x_data)) + ']'
test_labels = '[' + ','.join(map(str, grids)) + ']'
SSIDS = '[' + ','.join(map(lambda x: f'"{x}"', list(ssids.keys()))) + ']'


# Write JavaScript arrays to a JavaScript file
with open(r"C:\Users\shang\OneDrive\Desktop\data.js", 'w') as f:
    f.write(f'const test_data = {test_data};\n')
    f.write(f'const test_labels = {test_labels};\n')
    f.write(f'const SSIDS = {SSIDS};\n')
    f.write(f'module.exports = {{\n')
    f.write(f'  test_data,\n')
    f.write(f'  test_labels,\n')
    f.write(f'  SSIDS\n')
    f.write(f'}};')

X_train, X_test, y_train, y_test = train_test_split(x_data, grids, test_size=0.2, random_state=42)

# Initialize the KNN classifier
knn = KNeighborsClassifier(n_neighbors=2)  # You can adjust the number of neighbors as needed

# Train the KNN classifier
knn.fit(X_train, y_train)

# Predict on the test set
y_pred = knn.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

y_pred = y_pred.tolist()
# for i in range(len(y_pred)):
#     print(y_pred[i],y_test[i])

print("Accuracy:", accuracy)