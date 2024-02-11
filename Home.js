// Home.js

import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const navigation = useNavigation();
  const [employeeData, setEmployeeData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await AsyncStorage.getItem('employeeData');
        if (data) {
          setEmployeeData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  const navigateToUpdateDeleteScreen = (employee) => {
    navigation.navigate('UpdateDelete', { employee });
  };

  const deleteData = async (idNumber) => {
    try {
      const updatedData = employeeData.filter((employee) => employee.idNumber !== idNumber);
      await AsyncStorage.setItem('employeeData', JSON.stringify(updatedData));
      setEmployeeData(updatedData);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const filterData = () => {
    return employeeData.filter((employee) => {
      const searchTerms = searchInput.toLowerCase().split(' ');
      return searchTerms.every((term) =>
        (employee.name && employee.name.toLowerCase().includes(term)) ||
        (employee.destination && employee.destination.toLowerCase().includes(term))
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.background}>
        <View>
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchInput}
              onChangeText={(text) => setSearchInput(text)}
            />
          </View>
          {filterData().map((employee, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToUpdateDeleteScreen(employee)}
            >
              <View style={styles.employeeContainer}>
                <View style={styles.employeeCard}>
                  <Image
                    source={{ uri: employee.selectedImage }}
                    style={styles.employeeImage}
                  />
                  <View style={styles.employeeTextContainer}>
                    <Text style={styles.employeeName}>{employee.name}</Text>
                    <Text style={styles.employeePhoneNumber}>{employee.phoneNumber}</Text>
                    <Text style={styles.employeeDestination}>{employee.destination}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <View style={styles.addButton}>
          <Image
            source={require('./assets/images/add-user.png')}
            style={styles.addButtonIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
    marginLeft: 20,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  addButtonIcon: {
    width: 25,
    height: 25,
  },
  employeeContainer: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  employeeCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  employeeImage: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 15,
  },
  employeeTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  employeeDestination: {
    fontSize: 14,
    color: '#555',
  },
});
