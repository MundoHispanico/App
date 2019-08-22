import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Prueba from '../Prueba';


const HomeScrenTabNavigator = new TabNavigator({
    ScreenOne:{
        screen: Prueba,
        navigationOptions : {
            tabBarLabel : 'pagina 1',
            tabBarIcon: () => {
                <Ionicons name="md-compass" size={24}/>
            }
        }
    },
    ScreenTwo:{
        screen: Prueba,
        navigationOptions : {
            tabBarLabel : 'pagina 2',
            tabBarIcon: () => (
                <Ionicons name="md-compass" size={24}/>
            )
        }
    }
})

export default HomeScrenTabNavigator;
