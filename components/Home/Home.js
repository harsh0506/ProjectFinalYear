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
    //auth state is checked and if user is absent ,it is navigates on login page and if the user is present, the home page is shown 
    onAuthStateChanged(auth, async (user) => {
      if (user === null || user === undefined || user === "" || user === []) {
        await navigation.navigate("Login");
      }
      else {
        //the auth object returns email ,display name and uid which is stored inside user state 
        setUser({ userEmail: user.email, userName: user.displayName, userId: user.uid })

        try {
          //this api call returns the user data,and that data is being stored inside user state
          axios.get(`http://localhost:4000/user/userName/${user.email}`)
            .then(user => { setUser(user.data[0]) })
            .catch(err => { console.log(err) })

          // this api call returns the project which are created by the curent logged in user ,the cureent logged in user's teamadminid is used to get the project, and saved in
          //UserProjects state 
          axios.get(`http://localhost:4000/projects/ti/${user.uid}`)
            .then(user => { setUserProjects(user.data) })
            .catch(err => { console.log(err) })

        }
        catch (err) { console.log(err) }
      }
    })
  }, [1])

  //this code will set the userData stored in state user into globalstate usernameState
  userCredential.set(users)

  //function tohandle signout,after signout the user is sent to login page
  const Handle_SignOut = async () => {
    try {
      await SignOutMethod()
      navigation.push("Login")
    } catch (error) { console.log(error)  }
  }

  //this is other method which return user info and it's projects togther ,but haven't saved anywhere
  if (userCredential.get()._id !== undefined) {
    try {
      const id = String(userCredential.get()._id)
      const teamAdminId = String(userCredential.get().userId)
      axios.get(`http://localhost:4000/user/hhdd/${id}`, { params: { teamAdminId } })
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