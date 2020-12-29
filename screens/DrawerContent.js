/* eslint-disable react/jsx-props-no-spreading */
import DrawerSection from 'react-native-paper/lib/module/components/Drawer/DrawerSection';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import I18n from '../i18n';
import { SettingsContext } from '../SettingsContext';

function DrawerContent(props) {
  const [language] = useContext(SettingsContext);
  I18n.locale = language;
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1 }}>
          <DrawerSection style={{ marginTop: 15 }}>
            <DrawerItem
              icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
              label={I18n.t('home_page')}
              onPress={() => {
                props.navigation.navigate('HomeScreen');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => <Icon name="settings-outline" color={color} size={size} />}
              label={I18n.t('settings')}
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="md-mail-open-outline" color={color} size={size} />
              )}
              label={I18n.t('contact')}
              onPress={() => {
                props.navigation.navigate('Contact');
              }}
            />
          </DrawerSection>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

DrawerContent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default DrawerContent;
