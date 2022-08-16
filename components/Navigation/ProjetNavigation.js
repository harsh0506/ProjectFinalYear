import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import OverView from '../Project/ProjectPages/OverView';
import Activity from '../Project/ProjectPages/Activity';
import Calender from '../Project/ProjectPages/Calender';
import UploadImg from '../Project/ProjectPages/Files';
import Todo from '../Project/ProjectPages/Todo';

const Tab = createMaterialBottomTabNavigator();

const ProjetNavigation = ({projDetail}) => {
    return (
        <Tab.Navigator
            initialRouteName="OverView"
            activeColor="white"
            inactiveColor="white"
            barStyle={{ backgroundColor: 'white' }} >
            <Tab.Screen name="OverView" component={OverView} initialParams={{projDetail}}/>
            <Tab.Screen name="Activity" component={Activity} initialParams={{projDetail}}/>
            <Tab.Screen name="Calender" component={Calender} initialParams={{projDetail}}/>
            <Tab.Screen name="Files" component={UploadImg} initialParams={{projDetail}}/>
            <Tab.Screen name="Todo" component={Todo} initialParams={{projDetail}}/>
        </Tab.Navigator>
    )
}

export default ProjetNavigation
