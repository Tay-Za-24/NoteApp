import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.radioButtonContainer}>
        <View style={styles.radioButton}>
          {selected && <View style={styles.radioInnerCircle} />}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5DB075',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5DB075',
  },
  label: {
    color : "#666666",
    marginRight : 25,
  },
});

export default RadioButton;
