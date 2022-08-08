import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import OverView from '../Project/ProjectPages/OverView';
import Activity from '../Project/ProjectPages/Activity';
import Calender from '../Project/ProjectPages/Calender';
import UploadImg from '../Project/ProjectPages/Files';
import Todo from '../Project/ProjectPages/Todo';

const Tab = createMaterialBottomTabNavigator();

const ProjetNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="OverView"
            activeColor="white"
            inactiveColor="white"
            barStyle={{ backgroundColor: 'white' }} >
            <Tab.Screen name="OverView" component={OverView} />
            <Tab.Screen name="Activity" component={Activity} />
            <Tab.Screen name="Calender" component={Calender} />
            <Tab.Screen name="Files" component={UploadImg} />
            <Tab.Screen name="Todo" component={Todo} />
        </Tab.Navigator>
    )
}

export default ProjetNavigation
