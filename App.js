import React, { useContext } from 'react';
/* eslint-disable react/jsx-props-no-spreading */
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
import Settings from './screens/Settings';
import Contact from './screens/Contact';
import DrawerContent from './screens/DrawerContent';
import * as parameters from './utils/parameters';
import I18n from './i18n';
import { SettingsContext, SettingsProvider } from './SettingsContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabHome() {
  const [language] = useContext(SettingsContext);
  I18n.locale = language;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={I18n.t('home_page')}
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: parameters.color3,
          },
          headerTitleStyle: {
            fontSize: parameters.fontLarge,
            color: 'white',
            alignSelf: 'center',
          },
        }}
      />
      <Stack.Screen name="Article" component={Article} />
    </Stack.Navigator>
  );
}

function BottomTab() {
  const [language] = useContext(SettingsContext);
  I18n.locale = language;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#594F4F"
      barStyle={{ backgroundColor: '#45ADA8' }}>
      <Tab.Screen
        name="Tab Home"
        component={TabHome}
        options={{
          tabBarLabel: I18n.t('home_page'),
          tabBarIcon: () => (
            <MaterialCommunityIcons name="newspaper" size={20} color={parameters.color4} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarLabel: I18n.t('categories'),
          tabBarIcon: () => <MaterialIcons name="category" color={parameters.color1} size={20} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: () => <MaterialIcons name="search" color={parameters.color1} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeScreen" component={BottomTab} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Contact" component={Contact} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}
