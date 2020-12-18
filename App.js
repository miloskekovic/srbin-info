import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './screens/HomeScreen';
import Article from './screens/Article';
import Categories from './screens/Categories';
import Search from './screens/Search';
import { DrawerContent } from './screens/DrawerContent';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#594F4F"
      barStyle={{ backgroundColor: '#45ADA8' }}>
      <Tab.Screen name="Tab Home" component={TabHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={Categories} 
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function TabHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Article" component={Article} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent = {props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component={BottomTab} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}