import React from 'react';
import { Text, View, TouchableOpacity} from 'react-native';

import { styles } from './Home.style';

export default function HomeScreen({onPress}) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>LogOut</Text>
      </TouchableOpacity>
    </View>
  )
}
