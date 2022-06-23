import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { usernameState, taskListState } from '../GlobalState/Globalstate'
import { useState } from '@hookstate/core';
import AddTask from '../Task/AddTask';
import { get,getTask } from '../firebase/Crud';
import TaskList from '../Task/TaskList';
import { height, width } from '../Dimentions/Dimensions';
import Task from '../Task/Task';
import { app } from "../firebase/FirebaseConfig"
import { getAuth } from 'firebase/auth';
const auth = getAuth(auth)

const Home = () => {
  const auth = getAuth(app)
    
    const state = useState(usernameState)
    const tasks = useState(taskListState)
    let res = state.get()
    let idd = res.id
    React.useEffect(async () => {
      try {
        const data = await get("Task")
        const data2 = await getTask("Task",idd)

        console.log(data,data2)
        //tasks.set(data)
      } catch (error) {
        console.log(error)

      }

    }, [])

    return (
      <View style={styles.Main}>
        <Text>add data</Text>
        <AddTask />
        <TaskList />
      </View>
    )
  }
  

export default Home

const styles = StyleSheet.create({
  Main: {
    width, height, alignItems: "center",
    justifyContent: "center",
  }
})