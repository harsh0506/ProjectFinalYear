import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { height, width } from '../Dimentions/Dimensions'
import axios from 'axios'
import { useState } from '@hookstate/core'
import { projectState } from '../GlobalState/Globalstate'
const Createproj1 = ({ route, navigation }) => {

  const [teamAdminId, setUserId] = React.useState(route.params)
  const [projectName, setProjectName] = React.useState("")
  const projstate = useState(projectState)

  async function createProj() {
    try {
      let projectId = Math.random().toString(36).slice(7)
      const d = await axios.post("http://localhost:4000/projects", { teamAdminId, projectName, projectId });
      navigation.navigate("Project", d.data)
      console.log(d)
      projstate.set(d.data)
  console.log(projectState.get())

     // const a = await axios.put(`http://localhost:4000/user/arr/${teamAdminId}`, { "projects": projectId })
     // console.log(a)
    } catch (error) {
console.log(error)
    }
  }

  return (
    <View style={styles.Main}>
      <Text>Createproj1</Text>
      <TextInput
        placeholder='input the project name'
        value={projectName}
        onChangeText={setProjectName}
      />
      <Button onPress={createProj} title="clicl" />
    </View>
  )
}

export default Createproj1

const styles = StyleSheet.create({
  Main: {
    height: height,
    width: width,
  }
})