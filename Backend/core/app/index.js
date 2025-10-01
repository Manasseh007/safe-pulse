import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function HomeScreen() {
  const [lastTap, setLastTap] = useState(null);

  const handleTap = () => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      Alert.alert("Emergency!", "Double-tap detected. Alert sent!");
    } else {
      setLastTap(now);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleTap}>
        <Text style={styles.buttonText}>I'm in Danger</Text>
      </TouchableOpacity>
      <Text style={styles.info}>Double-tap the button to trigger an emergency.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc0cb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  button: {
    backgroundColor: '#ff4d6d',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  info: {
    marginTop: 20,
    fontSize: 16,
    color: '#333'
  }
});
