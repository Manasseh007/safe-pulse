import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Card from '../components/Card';

export default function SettingsScreen({ navigation }) {
  const [profile, setProfile] = useState({
    full_name: '',
    phone_number: '',
    emergency_contact: '',
    current_password: '',
    new_password: '',
    card_number: '',
    promo_code: '',
  });

  const updateProfile = () => {
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const updatePassword = () => {
    if (profile.current_password && profile.new_password) {
      Alert.alert('Success', 'Password updated successfully!');
      setProfile({...profile, current_password: '', new_password: ''});
    } else {
      Alert.alert('Error', 'Please fill in both password fields');
    }
  };

  const updateCard = () => {
    Alert.alert('Success', 'Card information updated!');
  };

  const applyPromoCode = () => {
    if (profile.promo_code) {
      Alert.alert('Success', 'Promo code applied!');
      setProfile({...profile, promo_code: ''});
    } else {
      Alert.alert('Error', 'Please enter a promo code');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>Safe Pulse</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Settings</Text>

        <Card>
          <Text style={styles.sectionTitle}>👤 Profile Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={profile.full_name}
            onChangeText={(text) => setProfile({...profile, full_name: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={profile.phone_number}
            onChangeText={(text) => setProfile({...profile, phone_number: text})}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Emergency Contact"
            value={profile.emergency_contact}
            onChangeText={(text) => setProfile({...profile, emergency_contact: text})}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.button} onPress={updateProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </Card>

        <Text style={styles.sectionTitle}>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          value={profile.current_password}
          onChangeText={(text) => setProfile({...profile, current_password: text})}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={profile.new_password}
          onChangeText={(text) => setProfile({...profile, new_password: text})}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={updatePassword}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Payment Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={profile.card_number}
          onChangeText={(text) => setProfile({...profile, card_number: text})}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={updateCard}>
          <Text style={styles.buttonText}>Update Card</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Promo Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Promo Code"
          value={profile.promo_code}
          onChangeText={(text) => setProfile({...profile, promo_code: text})}
        />
        <TouchableOpacity style={styles.button} onPress={applyPromoCode}>
          <Text style={styles.buttonText}>Apply Promo Code</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});