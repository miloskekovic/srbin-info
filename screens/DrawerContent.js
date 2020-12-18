import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';

export function DrawerContent(props) {
    return(
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={{flex: 1}}>
                    <Drawer.Section style={{marginTop: 15}}>
                        <DrawerItem
                            icon = {({color, size}) => (
                                <Icon
                                    name = 'home-outline'
                                    color = {color}
                                    size = {size}
                                />
                            )}
                            label = 'Home'
                            onPress = {() => {}}
                        />
                        <DrawerItem
                            icon = {({color, size}) => (
                                <Icon
                                    name = 'settings-outline'
                                    color = {color}
                                    size = {size}
                                />
                            )}
                            label = 'Settings'
                            onPress = {() => {}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    );
};
