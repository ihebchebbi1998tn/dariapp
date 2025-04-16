
import React from 'react';
import { Tabs } from 'expo-router';
import { Home, User, Building } from 'lucide-react-native';
import { useAuth } from '../../src/contexts/AuthContext';

/**
 * Tab layout specifically for owner users
 * Displays only: Dashboard, Properties, Profile
 */
export default function OwnerTabLayout() {
  const { user } = useAuth();
  
  console.log('Rendering owner-specific tabs layout');
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#9b87f5',  // Purple theme for owners
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="properties"
        options={{
          title: 'Propriétés',
          tabBarIcon: ({ color, size }) => (
            <Building size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
