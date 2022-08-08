import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { usernameState, taskListState } from '../GlobalState/Globalstate'
import { useState } from '@hookstate/core';
import AddTask from '../Task/AddTask';
import { get, getTask } from '../firebase/Crud';
import TaskList from '../Task/TaskList';
import { height, width } from '../Dimentions/Dimensions';
import Task from '../Task/Task';
import { TaskLists, ProjectLists } from '../ListRendere.js/SampleData';
import ListRendere from '../ListRendere.js/ListRendere';
import { SignOutMethod } from '../firebase/Auth';
import { app } from '../firebase/FirebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UploadImg from '../Project/ProjectPages/Files';
import ProjetNavigation from '../Navigation/ProjetNavigation';
import axios from 'axios';
const auth = getAuth(app)


const Home = ({ navigation }) => {
  const [users, setUser] = React.useState({ userName: "", userEmail: "", userId: "" })

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log(auth.currentUser)

      if (user === null) {
        navigation.navigate("Login")
      } else {
         setUser({ userEmail: user.email, userName: user.displayName, userId: user.uid })
         console.log(axios.get(`http://localhost:4000/user/${user.uid}`))
      }
    })
  },[1])



  const userCredential = useState(usernameState);
  userCredential.set(users)

  const Handle_SignOut = async () => {
    try {
      await SignOutMethod()
      navigation.push("Login")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View style={styles.Main}>
      <Text>welcome {users.userName}</Text>
      <UploadImg />
      <Button onPress={() => navigation.navigate("Createproj1" , users.userId)} title="CreateProj" />
      <Button onPress={Handle_SignOut} title="log out" />
    </View>
  )
}


export default Home

const styles = StyleSheet.create({
  Main: {
    width, height
  }
})