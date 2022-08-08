import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { height, width } from '../Dimentions/Dimensions'
import axios from 'axios'
const Createproj1 = ({route,navigation}) => {
  console.log(route.params)
  const[teamAdminId , setUserId] = React.useState(route.params)
  const [projectName , setProjectName] = React.useState("")
  async function createProj(){
    try {
     const d = await axios.post("http://localhost:4000/projects" ,{teamAdminId ,projectName,projectId:Math.random().toString(36).slice(7) } );
     navigation.navigate("Project" , d.data)
     console.log(d)
     axios.put(`http://localhost:4000/user/arr/${teamAdminId}`,{"projects":d.data._id})
    } catch (error) {
      
    }
  }
  return (
    <View style={styles.Main}>
      <Text>Createproj1</Text>
      <TextInput 
      placeholder='input the project name'
      value={projectName}
      onChangeText = {setProjectName}
      />
      <Button onPress={createProj} title="clicl" />
    </View>
  )
}

export default Createproj1

const styles = StyleSheet.create({
    Main:{
        height:height,
        width:width,
    }
})