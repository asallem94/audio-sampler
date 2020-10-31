import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
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
      <List/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
