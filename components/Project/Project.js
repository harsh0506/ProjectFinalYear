import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UploadImg from './ProjectPages/Files'
import ProjetNavigation from '../Navigation/ProjetNavigation'
import { height, width } from '../Dimentions/Dimensions'

const Project = ({ route }) => {
  console.log(route.params.projectName)
  return (
    <View style={styles.Main}>
      <Text>Project {route.params.projectName}</Text>
      <ProjetNavigation projDetail={route.params} />
    </View>
  )
}

export default Project

const styles = StyleSheet.create({
  Main: {
    height: height, width: width,
  }
})