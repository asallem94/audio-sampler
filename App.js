import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import List from './app/components/List'


/*
AUDIO FILES

https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
...
https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3



*/
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Default Home Page</Text>
      <List/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
