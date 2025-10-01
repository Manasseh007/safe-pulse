import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function GradientBackground({ children, colors = ['#f8f9fa', '#e9ecef'] }) {
  return (
    <View style={[styles.container, { backgroundColor: colors[0] }]}>
      <View style={[styles.gradient, { backgroundColor: colors[1] }]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    opacity: 0.3,
  },
});