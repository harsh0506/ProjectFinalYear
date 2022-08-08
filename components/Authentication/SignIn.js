import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SigninMethod } from '../firebase/Auth'
import { set } from '../firebase/Crud'
import { height, width } from '../Dimentions/Dimensions'
import axios from "axios"

const Signin = ({navigation}) => {
    const [userName, setUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [passWord, setPass] = React.useState("")
    const getSignin = async () => {
        try {
            const res = await SigninMethod(email, passWord)
            res.userName = userName
            await axios.post("http://localhost:4000/user" , res)
            console.log(res)
            navigation.push("Home")
            set({userName,passWord , res })
        } catch (error) { console.log(error) }
    }
    return (
        <View style={styles.Main}>
            <View>
                <Text>signin part</Text>
            </View>
            <View>
                <TextInput
                    placeholder='email'
                    value={email}
                    onChangeText={setEmail} />
                <TextInput
                    placeholder='username'
                    value={userName}
                    onChangeText={setUsername} />
                <TextInput
                    placeholder='Password'
                    value={passWord}
                    onChangeText={setPass}
                    keyboardType="visible-password"
                    secureTextEntry="true"
                />
                <TouchableOpacity
                    onPress={getSignin}
                >
                    <Text>Signin</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    
}

export default Signin

const styles = StyleSheet.create({
    Main:{
height,width
    }
})