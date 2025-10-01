import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>🛡️</Text>
          <Text style={styles.logo}>Safe Pulse</Text>
        </View>
      </View>
      
      <View style={styles.heroSection}>
        <View style={styles.iconContainer}>
          <Text style={styles.heroIcon}>💖</Text>
        </View>
        <Text style={styles.title}>Welcome to i-Protect</Text>
        <Text style={styles.subtitle}>Your personal safety companion</Text>
        <Text style={styles.description}>Emergency alerts at your fingertips. Stay connected, stay safe.</Text>
      </View>
      
      <View style={styles.content}>
        
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('SignUp', { userType: 'user' })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonIcon}>👤</Text>
          <Text style={styles.buttonText}>Sign Up as User</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.securityButton]}
          onPress={() => navigation.navigate('SignUp', { userType: 'security' })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonIcon}>🏢</Text>
          <Text style={styles.buttonText}>Sign Up as Security Company</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonIcon}>🔑</Text>
          <Text style={[styles.buttonText, styles.loginText]}>Log In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.testButton]}
          onPress={() => navigation.navigate('TestScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonIcon}>🧪</Text>
          <Text style={[styles.buttonText, styles.testText]}>Test Navigation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce4ec',
    background: 'linear-gradient(135deg, #f8bbd9 0%, #e91e63 100%)',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'System',
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  heroIcon: {
    fontSize: 80,
    color: '#e91e63',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'System',
  },
  description: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.9,
    fontFamily: 'System',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: '#e91e63',
  },
  securityButton: {
    backgroundColor: '#ad1457',
  },
  loginButton: {
    backgroundColor: '#c2185b',
    borderWidth: 2,
    borderColor: '#880e4f',
  },
  buttonIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#fff',
  },
  testButton: {
    backgroundColor: '#1976d2',
    borderWidth: 2,
    borderColor: '#0d47a1',
  },
  testText: {
    color: '#fff',
  },
});