import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { usernameState } from '../GlobalState/Globalstate'
import { createState, useState } from '@hookstate/core';


const Home = ({navigation}) => {
    const state = useState(usernameState)

  return (
    <View>
      <Text>{state.get()}</Text>
      <TouchableOpacity
      onPress={() => navigation.navigate("Team1")}>
        Press me
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})