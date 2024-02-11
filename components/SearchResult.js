// SearchResult.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SearchResult = ({ employee, navigateToNewScreen }) => {
  return (
    <TouchableOpacity onPress={() => navigateToNewScreen(employee)}>
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
  );
};

const styles = StyleSheet.create({
  employeeContainer: {
    margin: 20,
  },
  employeeCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 3,
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

export default SearchResult;
