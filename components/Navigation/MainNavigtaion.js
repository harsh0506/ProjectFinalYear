import { View } from 'react-native';
import React from 'react'
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


const auth = getAuth(app)
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    const user = auth.currentUser
     const [userM,setUserM] = React.useState({
        id:"",
        email:""
     })
    const [tasklist, setTasklist] = React.useState("")
    const username = useState(usernameState)
    
    const checkauths = () => {
        onAuthStateChanged(auth, (user) => (user !== null) ? setUserM({ id: user.uid, email: user.email }) : console.log("error"))
    }
    React.useEffect(async () => {
       checkauths()
       await checkauth()
    }, [])
    if (userM.id !== null){
        console.log(userM.id)
        getTask("Task",userM.id).then((dm)=> console.log(dm)).catch(err => console.log(err))
       }

    const geD = async()=>{
        const d = await getTask("task" , userM.id)
        console.log(d)
    }   
    if (userM === null) {
        return (
            <View style={{ width: "100%", height: "100%" }}>
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
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default MainNavigation
