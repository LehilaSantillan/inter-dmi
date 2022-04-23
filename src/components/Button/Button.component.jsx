import React from 'react';
import {styles} from "./Button.style";
import { Text, TouchableOpacity } from 'react-native';

export default function ButtonComponent({onPress, title = "Button", color="#581845"}) {  
  return (
    <TouchableOpacity 
    style={[styles.button, { backgroundColor: color }]}
    onPress={onPress}
    >
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}