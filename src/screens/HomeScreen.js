import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isTablet = width > 768;

const Tab = createBottomTabNavigator();

function HomeTab({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Safe Pulse</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>i-Protect</Text>
        <Text style={styles.subtitle}>Stay Safe, Stay Protected</Text>

        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={() => navigation.navigate('Emergency')}
          activeOpacity={0.9}
        >
          <View style={styles.emergencyInner}>
            <Text style={styles.emergencyText}>💖</Text>
            <Text style={styles.emergencyLabel}>SEND ALERT</Text>
            <Text style={styles.emergencySubtext}>Tap for Help</Text>
          </View>
          <View style={styles.pulseRing} />
        </TouchableOpacity>

        <Text style={styles.instruction}>Double tap for emergency alert</Text>
      </View>
    </View>
  );
}

function ProfileTab({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userPhone');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Safe Pulse</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Subscription')}
        >
          <Text style={styles.menuText}>Subscription</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuButton, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e74c3c',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeTab} 
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileTab} 
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: width * 0.05,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
  },
  logo: {
    fontSize: isTablet ? 22 : isSmallScreen ? 16 : 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.08,
  },
  title: {
    fontSize: isTablet ? 40 : isSmallScreen ? 28 : 32,
    fontWeight: 'bold',
    marginBottom: height * 0.015,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: isTablet ? 20 : isSmallScreen ? 14 : 16,
    color: '#666',
    marginBottom: height * 0.06,
    textAlign: 'center',
  },
  emergencyButton: {
    position: 'relative',
    width: isTablet ? 300 : isSmallScreen ? 200 : 250,
    height: isTablet ? 300 : isSmallScreen ? 200 : 250,
    borderRadius: isTablet ? 150 : isSmallScreen ? 100 : 125,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  emergencyInner: {
    backgroundColor: '#e91e63',
    width: isTablet ? 270 : isSmallScreen ? 180 : 220,
    height: isTablet ? 270 : isSmallScreen ? 180 : 220,
    borderRadius: isTablet ? 135 : isSmallScreen ? 90 : 110,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: Platform.OS === 'android' ? 8 : 0,
    shadowColor: '#e91e63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.3 : 0,
    shadowRadius: Platform.OS === 'ios' ? 8 : 0,
  },
  pulseRing: {
    position: 'absolute',
    width: isTablet ? 300 : isSmallScreen ? 200 : 250,
    height: isTablet ? 300 : isSmallScreen ? 200 : 250,
    borderRadius: isTablet ? 150 : isSmallScreen ? 100 : 125,
    borderWidth: 3,
    borderColor: '#e91e63',
    opacity: 0.3,
  },
  emergencyText: {
    fontSize: isTablet ? 90 : isSmallScreen ? 50 : 70,
    marginBottom: 5,
  },
  emergencyLabel: {
    color: '#fff',
    fontSize: isTablet ? 24 : isSmallScreen ? 16 : 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  emergencySubtext: {
    color: '#fff',
    fontSize: isTablet ? 16 : isSmallScreen ? 10 : 12,
    opacity: 0.8,
    marginTop: 5,
    textAlign: 'center',
  },
  instruction: {
    fontSize: isTablet ? 18 : isSmallScreen ? 12 : 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: width * 0.1,
  },
  menuButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: isTablet ? 20 : 15,
    paddingHorizontal: width * 0.08,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    maxWidth: isTablet ? 400 : 350,
    alignItems: 'center',
    minHeight: 50,
  },
  menuText: {
    fontSize: isTablet ? 20 : isSmallScreen ? 14 : 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    marginTop: height * 0.03,
  },
  logoutText: {
    color: '#fff',
  },
});