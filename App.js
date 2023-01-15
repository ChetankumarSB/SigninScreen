import React from 'react';
import {SafeAreaView, 
  StyleSheet, 
  TextInput, 
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

const App = () => {

  const [fullname, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [dob, setDOB] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const saveData = async (profileInfo) => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(profileInfo));
    } catch (e) {
      console.log(e);
    }
  }

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('data');
      if (value !== null) {
        console.log("Data saved"+value)
        return JSON.parse(value);
      }
    } catch (e) {
      console.log(e);
    }
  }

  handlingbutton = () => {

    var emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (emailRegex.test(email) && phoneNumber.length==10) {

      const profileInfo = {
        fullname,
        email,
        dob,
        country,
        phoneNumber
      };

      saveData(profileInfo)
      
      // retrieveData() -> this can be used to retrieve Data
  
      Alert.alert(JSON.stringify(profileInfo));
      
    } else {
      Snackbar.show({
        text: 'Please fill out information correctly',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:  "#B2110F",
      });
    }
  }

  return (
    <>
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity style={styles.headerContainer}>
        <Icon name="chevron-left" size={20} />
        <Text style={styles.headerText}>SignIn</Text>
        </TouchableOpacity>
        <View style={styles.container}>
        <TouchableOpacity style={styles.profilePicContainer}>
          <Image
              source={require('./assets/profilePic.jpg')}
              style={styles.profileImg}
            />
          <Icon name="edit-3"  size={25} style={styles.profileIcon} />
        </TouchableOpacity>
        <Text style={styles.name}>Samuel_ceaser</Text>
          <Text style={styles.text}>Personal information</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setFullName(text)}
            value={fullname}
            placeholder="Full Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Email Address"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setDOB(text)}
            value={dob}
            placeholder="DOB"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setCountry(text)}
            value={country}
            placeholder="Country"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
            placeholder="Phone Number*"
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={handlingbutton}
            style={styles.button}
          >
          <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          </View>
         </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 8,
    marginHorizontal: 20,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: "#FFFFFF",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 4
  },
  text: {
    fontSize: 12,
    margin: 8,
    fontWeight: 'bold',
    textTransform:'uppercase',
    marginHorizontal: 20,
    marginTop: 20
  },
  name: {
    margin: 8,
    fontWeight: 'bold',
    height: 40,
    padding: 10,
    textAlign: "center",
    color: "#B2110F",
    backgroundColor: "#FFFFFF",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 4,
    marginHorizontal: 20,
    marginTop: -50
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 200 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#FAFBF9",
    top: -80,
  },
  profileIcon: {
    position: 'absolute',
    top: 30,
    left: 210,
    elevation: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 200 / 2 ,
  },
  headerText: {
    fontWeight: 'bold',
    textTransform:'uppercase',
    marginBottom: 60
  },
  headerContainer: {
    flexDirection: 'row',
    margin: 20
  },
  profilePicContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor:"#F0EFEF",
    margin: 20,
    borderRadius: 4
  },
  button: {
    margin: 8,
    height: 40,
    padding: 10,
    backgroundColor: "#B2110F",
    borderRadius: 4,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    textTransform:'uppercase',  
    fontWeight: 'bold',
  },
});

export default App;