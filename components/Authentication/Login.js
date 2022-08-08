import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LoginMethod } from '../firebase/Auth'
import { usernameState } from '../GlobalState/Globalstate'
import { useState } from '@hookstate/core';
import { height, width } from '../Dimentions/Dimensions';

const Login = ({ navigation }) => {
    //use state variable to save the state of the email and passswords
    const [email, setEmail] = React.useState("")
    const [passWord, setPass] = React.useState("")
    //the globalstate variable is created to store the current users id and email
    const state = useState(usernameState)

    const getLogin = async () => {
        try {
            const res = await LoginMethod(email, passWord)
            state.set({ userEmail: res[0], userId: res[1] })
            navigation.push("Home")
        } catch (error) { console.log(error) }
    }
    return (
        <View style={styles.Main}>
            <View>
                <Text>Login part</Text>
            </View>
            <View>
                <TextInput
                    placeholder='email'
                    value={email}
                    onChangeText={setEmail} />
                <TextInput
                    placeholder='Password'
                    value={passWord}
                    onChangeText={setPass}
                    keyboardType="visible-password"
                    secureTextEntry="true"
                />
                <TouchableOpacity
                    onPress={getLogin}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>havent signined up,sign up now
                    <Text
                        style={{ color: "blue" }}
                        onPress={() => navigation.navigate("signin")}>sign up</Text>
                </Text>
            </View>
        </View>
    )

}

export default Login

const styles = StyleSheet.create({
    Main: {
        height, width
    }
})