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
import PersonalProjRenderer from './PersonalProjRenderer';
import { userInfo } from '../Crud';
const auth = getAuth(app)


const Home = ({ navigation }) => {
  const userCredential = useState(usernameState);
  const [users, setUser] = React.useState({
    userEmail: "",
    userId: "",
    userName: "",
    profilepic: "",
    githubUrl: "",
    projects: [],
    Teams: [],
    id: ""
  })

  const [userProjects, setUserProjects] = React.useState([])

  React.useEffect(async () => {
    
    onAuthStateChanged(auth, async(user) => {
      if (user === null || user === undefined || user === "" || user === []) {
        navigation.navigate("Login")
      } else {
        setUser({ userEmail: user.email, userName: user.displayName, userId: user.uid })
        console.log(user.uid)
        const as = user.email
        const m = await userInfo(as)
        console.log(m)
        try {
          axios.get(`http://localhost:4000/user/userName/${user.email}`)
            .then(user => {
              console.log(user.data)
              setUser(user.data[0]);
              console.log(user.data[0]._id)
            })
            .catch(err => { console.log(err) })

          axios.get(`http://localhost:4000/projects/ti/${user.uid}`)
            .then(user => { console.log(user); setUserProjects(user.data) })
            .catch(err => { console.log(err) })

        }
        catch (err) { }
      }
    })
  }, [1])


  console.log(users.userEmail)
  userCredential.set(users)

  const Handle_SignOut = async () => {
    try {
      await SignOutMethod()
      navigation.push("Login")
    } catch (error) {
      console.log(error)
    }
  }

  console.log(userCredential.get()._id)

  if (userCredential.get()._id !== undefined) {
    try {
      const id = String(userCredential.get()._id)
      const teamAdminId = String(userCredential.get().userId)
      axios.get(`http://localhost:4000/user/hhdd/${id}` , { params: { teamAdminId } })
        .then(user => {
          console.log(user.data)

        })
        .catch(err => console.log(err))
    } catch (error) {
      console.log(err)
    }

  }


  return (
    <View style={styles.Main}>
      <Text>welcome {users.userName}</Text>
      <Button onPress={() => navigation.navigate("Createproj1", users.userId)} title="CreateProj" />
      <PersonalProjRenderer data={userProjects} nav={navigation} />
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