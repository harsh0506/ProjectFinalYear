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
const auth = getAuth(app)


const Home = ({ navigation }) => {
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

  const[userProjects , setUserProjects] = React.useState([])

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log(auth.currentUser)

      if (user === null) {
        navigation.navigate("Login")
      } else {
        setUser({ userEmail: user.email, userName: user.displayName, userId: user.uid })
        try {
          axios.get(`http://localhost:4000/user/userName/${user.email}`)
            .then(user => {
              setUser({
                Teams: [],
                githubUrl: user.data.githubUrl,
                profilepic: user.data.profilepic,
                projects: [],
                userEmail: user.data.userEmail,
                userId: user.data.userId,
                userName: user.data.userName,
                _id: user.data._id,
              });
              console.log(user.data.userEmail)
            })
            .catch(err => { console.log(err) })

          axios.get(`http://localhost:4000/projects/ti/${user.uid}`)
            .then(user => { console.log(user);setUserProjects(user.data) })
            .catch(err => { console.log(err) })

        }
        catch (err) { }
      }
    })
  }, [1])


  console.log(users)
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
      <Button onPress={() => navigation.navigate("Createproj1", users.userId)} title="CreateProj" />
      <PersonalProjRenderer data={userProjects} nav={navigation}/>
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