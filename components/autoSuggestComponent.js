// AutoSuggestComponent.js

import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';

const AutoSuggestComponent = ({ value, onChangeText, onSelect, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filterSuggestions = (input) => {
    const filteredSuggestions = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    return filteredSuggestions;
  };

  const handleInputChange = (input) => {
    onChangeText(input);
    setShowSuggestions(input.length > 0);
  };

  const handleSelectSuggestion = (item) => {
    onSelect(item);
    setShowSuggestions(false);
  };

  return (
    <View style={{ width: '90%', marginTop: 20 }}>
      <TextInput
        value={value}
        onChangeText={handleInputChange}
        placeholder="Destination"
        style={{
          borderWidth: 1,
          borderColor: 'black',
          width: '100%', 
          height: 40,
          borderRadius: 10,
          paddingLeft: 10,
        }}
      />
      {showSuggestions && (
        <FlatList
          data={filterSuggestions(value)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
              <Text
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.toString()}
          style={{
            position: 'absolute',
            width: '100%',
            backgroundColor: 'white',
            zIndex: 1,
            top: 40,
          }}
        />
      )}
    </View>
  );
};

export default AutoSuggestComponent;
