import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Alert, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImageViewer from './components/ImageViewer';
import AutoSuggestComponent from './components/autoSuggestComponent';
const PlaceholderImage = require('./assets/images/background-image.png');

export default function New({ route }) {
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [idNumber, setIDNumber] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [fathername, setFatherName] = useState('');
  const [destination, setDestination] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const { employee } = route.params || {};
    if (employee) {
      setEditing(true);
      setIDNumber(employee.idNumber);
      setAddress(employee.address);
      setName(employee.name);
      setFatherName(employee.fathername);
      setDestination(employee.destination);
      setPhoneNumber(employee.phoneNumber);
      setPhoneNumber1(employee.phoneNumber1);
      setSelectedImage(employee.selectedImage);
    }
  }, [route.params]);

  const formatIDNumber = (input) => {
    const formattedInput = input.replace(/[^\d]/g, '');
    let formattedID = '';
    for (let i = 0; i < formattedInput.length; i++) {
      if (i === 5 || i === 12) {
        formattedID += '-';
      }
      formattedID += formattedInput.charAt(i);
    }
    setIDNumber(formattedID.slice(0, 15));
  };

  const formatPhoneNumber = (input) => {
    const formattedInput = input.replace(/[^\d]/g, '');
    let formattedPhoneNumber = '';
    for (let i = 0; i < formattedInput.length; i++) {
      if (i === 4) {
        formattedPhoneNumber += '-';
      }
      formattedPhoneNumber += formattedInput.charAt(i);
    }
    setPhoneNumber(formattedPhoneNumber.slice(0, 13));
  };

  const formatPhoneNumber1 = (input) => {
    const formattedInput = input.replace(/[^\d]/g, '');
    let formattedPhoneNumber1 = '';
    for (let i = 0; i < formattedInput.length; i++) {
      if (i === 4) {
        formattedPhoneNumber1 += '-';
      }
      formattedPhoneNumber1 += formattedInput.charAt(i);
    }
    setPhoneNumber1(formattedPhoneNumber1.slice(0, 13));
  };

  const capitalizeFirstLetter = (text) => {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleNameChange = (text) => {
    const formattedName = capitalizeFirstLetter(text);
    setName(formattedName);
  };

  const handleFatherNameChange = (text) => {
    const formattedFatherName = capitalizeFirstLetter(text);
    setFatherName(formattedFatherName);
  };

  const handleDestinationChange = (text) => {
    const formattedDestination = capitalizeFirstLetter(text);
    setDestination(formattedDestination);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  const saveData = async () => {
    try {
      const existingData = await AsyncStorage.getItem('employeeData');
      const employeeData = existingData ? JSON.parse(existingData) : [];

      const newEmployeeData = {
        idNumber: idNumber || Math.random().toString(36).substring(7),
        name,
        fathername,
        phoneNumber,
        address,
        phoneNumber1,
        destination,
        selectedImage,
      };

      employeeData.push(newEmployeeData);

      await AsyncStorage.setItem('employeeData', JSON.stringify(employeeData));

      Alert.alert('Data saved successfully!');
      navigation.goBack(); // Navigate back to Home screen after saving
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.top}>
          <TouchableOpacity style={styles.imageView} onPress={pickImageAsync}>
            {selectedImage ? (
              <ImageViewer selectedImage={selectedImage} />
            ) : (
              <ImageViewer placeholderImageSource={PlaceholderImage} />
            )}
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          autoCapitalize="words"
          onChangeText={handleNameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Father Name"
          value={fathername}
          autoCapitalize="words"
          onChangeText={handleFatherNameChange}
        />
        <AutoSuggestComponent
          value={destination}
          onChangeText={(text) => handleDestinationChange(text)}
          onSelect={(item) => setDestination(item)}
          suggestions={[
            'Manager',
            'Line Checker',
            'Operator',
            'Mechanic',
            'Electrician',
            'Cleaner',
            'Quality Checker',
            'Patching',
          ]}
        />
        <TextInput
          placeholder="Enter ID Card Number"
          keyboardType="numeric"
          maxLength={15}
          value={idNumber}
          onChangeText={formatIDNumber}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone Number"
          keyboardType="numeric"
          maxLength={12}
          value={phoneNumber}
          onChangeText={formatPhoneNumber}
          style={styles.input}
        />
        <TextInput
          placeholder="Another Phone Number"
          keyboardType="numeric"
          maxLength={12}
          value={phoneNumber1}
          onChangeText={formatPhoneNumber1}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Address"
          multiline={true}
          textAlignVertical="top"
          autoCapitalize="words"
          style={styles.input1}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveData}>
          <Text style={{ color: 'white' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  imageView: {
    marginBottom: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
  },
  input1: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
  },
  saveButton: {
    marginBottom: 40,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});