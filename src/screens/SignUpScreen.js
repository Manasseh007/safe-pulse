import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({ navigation, route }) {
  const { userType } = route.params;
  const [formData, setFormData] = useState({
    phone_number: '',
    full_name: '',
    password: '',
    emergency_contact: '',
    company_name: '',
    location: '',
  });

  const handleSignUp = async () => {
    if (!formData.phone_number.trim() || !formData.password.trim()) {
      Alert.alert('Error', 'Phone number and password are required');
      return;
    }
    
    if (userType === 'user' && (!formData.full_name.trim() || !formData.emergency_contact.trim())) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    
    if (userType === 'security' && (!formData.company_name.trim() || !formData.location.trim())) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    
    if (!/^[+]?[0-9]{10,15}$/.test(formData.phone_number.replace(/\s/g, ''))) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    
    try {
      const endpoint = userType === 'security' 
        ? 'http://127.0.0.1:8000/api/security-company/register/'
        : 'http://127.0.0.1:8000/api/auth/signup/';
      
      const payload = userType === 'security' 
        ? {
            username: formData.phone_number,
            password: formData.password,
            company_name: formData.company_name,
            location: formData.location,
            phone_number: formData.phone_number,
          }
        : {
            phone_number: formData.phone_number,
            full_name: formData.full_name,
            password: formData.password,
            emergency_contact: formData.emergency_contact,
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (response.ok) {
        if (data.token) {
          await AsyncStorage.setItem('userToken', data.token);
        }
        navigation.navigate('Subscription');
      } else {
        Alert.alert('Error', data.message || 'Sign up failed');
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
        <Text style={styles.title}>
          Sign Up as {userType === 'security' ? 'Security Company' : 'User'}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={formData.phone_number}
          onChangeText={(text) => setFormData({...formData, phone_number: text})}
          keyboardType="phone-pad"
        />

        {userType === 'user' ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.full_name}
              onChangeText={(text) => setFormData({...formData, full_name: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Emergency Contact"
              value={formData.emergency_contact}
              onChangeText={(text) => setFormData({...formData, emergency_contact: text})}
              keyboardType="phone-pad"
            />
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Company Name"
              value={formData.company_name}
              onChangeText={(text) => setFormData({...formData, company_name: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={formData.location}
              onChangeText={(text) => setFormData({...formData, location: text})}
            />
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});