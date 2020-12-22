import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import I18n from '../i18n';
import * as dimensions from '../utils/parameters';
import { View } from '../utils/components';

const serbiaLogo = require('../icons/flags/serbia.png');
const unitedStatesLogo = require('../icons/flags/united_states.png');
const germanyLogo = require('../icons/flags/germany.png');
const frenchLogo = require('../icons/flags/french.png');
const italianLogo = require('../icons/flags/italian.png');

const Settings = () => {
  const [language, setLanguage] = useState('de_de');
  I18n.locale = language;

  const languages = [
    {
      label: I18n.t('serbian_cyrillic'),
      value: 'sr_Cyrl_RS',
      icon: () => (
        <Image
          source={serbiaLogo}
          style={{
            height: 18,
            width: 18,
            resizeMode: 'contain',
          }}
          resizeMode="cover"
        />
      ),
      hidden: true,
    },
    {
      label: I18n.t('serbian_latin'),
      value: 'sr_Latn_RS',
      icon: () => (
        <Image
          source={serbiaLogo}
          style={{
            height: 18,
            width: 18,
            resizeMode: 'contain',
          }}
          resizeMode="cover"
        />
      ),
    },
    {
      label: I18n.t('english'),
      value: 'en_us',
      icon: () => (
        <Image
          source={unitedStatesLogo}
          style={{
            height: 18,
            width: 18,
            resizeMode: 'contain',
          }}
          resizeMode="cover"
        />
      ),
    },
    {
      label: I18n.t('german'),
      value: 'de_de',
      icon: () => (
        <Image
          source={germanyLogo}
          style={{
            height: 18,
            width: 18,
            resizeMode: 'contain',
          }}
          resizeMode="cover"
        />
      ),
    },
    {
      label: I18n.t('french'),
      value: 'fr_fr',
      icon: () => (
        <Image
          source={frenchLogo}
          style={{
            height: 18,
            width: 18,
            resizeMode: 'contain',
          }}
          resizeMode="cover"
        />
      ),
    },
    {
      label: I18n.t('italian'),
      value: 'it_it',
      icon: () => (
        <Image
          source={italianLogo}
          style={{
            height: 18,
            width: 18,
            resizeMode: 'contain',
          }}
          resizeMode="cover"
        />
      ),
    },
  ];

  return (
    <View>
      <Text
        style={{
          fontWeight: 'bold',
          marginBottom: dimensions.screenWidth * 0.01,
        }}>
        {I18n.t('language_selection')}
      </Text>
      <DropDownPicker
        items={languages}
        containerStyle={{ height: 40 }}
        style={{ width: '100%', backgroundColor: 'silver', borderColor: 'black' }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => {
          setLanguage(item.value);
          I18n.t(item.value);
        }}
      />
    </View>
  );
};

export default Settings;
