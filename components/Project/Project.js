import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UploadImg from './ProjectPages/Files'
import ProjetNavigation from '../Navigation/ProjetNavigation'
import { height, width } from '../Dimentions/Dimensions'

const Project = ({route}) => {
    console.log(route.params)
  return (
    <View style={styles.Main}>
      <Text>Project</Text>
      <ProjetNavigation />
    </View>
  )
}

export default Project

const styles = StyleSheet.create({
Main:{
  height:height,width:width,
}
})