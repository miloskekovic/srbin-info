import React from 'react';
import { Text, Image } from 'react-native';
import { View } from '../utils/components';
import * as parameters from '../utils/parameters';

const logo = require('../icons/logos/logo_2.png');

export default function Contact() {
  return (
    <View>
      <Text>Impresum</Text>
      <Image
        style={{ width: '100%', height: parameters.screenHeight * 0.2, resizeMode: 'cover' }}
        source={logo}
      />
    </View>
  );
}
