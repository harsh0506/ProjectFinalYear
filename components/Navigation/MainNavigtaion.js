import { View } from 'react-native';
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Authentication/Login';
import Signin from '../Authentication/SignIn';
import Home from '../Home/Home';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/FirebaseConfig';
import { useState } from '@hookstate/core';
import { usernameState } from '../GlobalState/Globalstate';
import { getTask } from '../firebase/Crud';
import { checkauth } from '../firebase/Auth';
import Createproj1 from '../Project/Createproj1';
import Project from '../Project/Project';


const auth = getAuth(app)
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    const [userM, setUserM] = React.useState({
        id: "",
        email: ""
    })
    const [tasklist, setTasklist] = React.useState([])



    useEffect(async () => {
        checkauths()
    }, [])

    const checkauths = () => {
        onAuthStateChanged(auth, (user) => (user !== null) ? setUserM({ id: user.uid, email: user.email }) : console.log("error"))
    }

    (userM.id !== null) ? getTask("Task", userM.id).then((dm) => setTasklist(dm)).catch(err => console.log(err)) : console.log("userid id null")

    if (userM === null) {
        return (
            <View >
                <NavigationContainer >
                    <Stack.Navigator >
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="signin" component={Signin} />
                        <Stack.Screen name="Home" component={Home} />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        )
    }
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
