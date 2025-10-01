import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function EmergencyScreen({ navigation }) {
  const [countdown, setCountdown] = useState(3);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      sendEmergencyAlert();
    }
    return () => clearInterval(interval);
  }, [isActive, countdown]);

  const startCountdown = () => {
    setIsActive(true);
  };

  const cancelAlert = () => {
    setIsActive(false);
    setCountdown(3);
    navigation.goBack();
  };

  const sendEmergencyAlert = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Location permission denied');
        return;
      }
      
      const position = await Location.getCurrentPositionAsync({});
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      const API_BASE_URL = __DEV__ ? 'http://10.0.2.2:8000' : 'https://your-api-domain.com';
      const response = await fetch(`${API_BASE_URL}/api/send-emergency/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location }),
      });

      if (response.ok) {
        navigation.navigate('Success');
      } else {
        Alert.alert('Error', 'Failed to send emergency alert');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>Safe Pulse</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Emergency Alert</Text>
        
        {!isActive ? (
          <>
            <TouchableOpacity 
              style={styles.emergencyButton}
              onPress={startCountdown}
            >
              <Text style={styles.emergencyText}>🚨</Text>
              <Text style={styles.emergencyLabel}>TAP TO ACTIVATE</Text>
            </TouchableOpacity>
            <Text style={styles.instruction}>
              This will send an emergency alert to your contacts and nearby security companies
            </Text>
          </>
        ) : (
          <>
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownText}>{countdown}</Text>
              <Text style={styles.countdownLabel}>Sending alert in...</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={cancelAlert}
            >
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    fontSize: 16,
    color: '#e74c3c',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  emergencyButton: {
    backgroundColor: '#e74c3c',
    width: 250,
    height: 250,
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emergencyText: {
    fontSize: 80,
    marginBottom: 10,
  },
  emergencyLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  countdownText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  countdownLabel: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#666',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  cancelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});