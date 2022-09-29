//imports
import { View } from 'react-native';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Authentication/Login';
import Signin from '../Authentication/SignIn';
import Home from '../Home/Home';
import Createproj1 from '../Project/Createproj1';
import Project from '../Project/Project';

//stack navigator
const Stack = createNativeStackNavigator();

//navigaton container
const MainNavigation = () => {  
    return (
        <View>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Createproj1" component={Createproj1} />
                    <Stack.Screen name="signin" component={Signin} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Project" component={Project} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default MainNavigation
