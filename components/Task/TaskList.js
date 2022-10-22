import { FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React from 'react'
import { createState, useState } from '@hookstate/core';
import { projectState, taskListState } from '../GlobalState/Globalstate';
import { height, width } from '../Dimentions/Dimensions';
import { deleteDocs } from '../firebase/Crud';
import axios from 'axios';
const TaskLists = ({ tasks }) => {
    const state = useState(projectState)
    // const [data, setData] = React.useState([])
    let res = state.get()
    console.log(state.get())
    console.log(res)
    const taskks = new Array(tasks.TaskList)
    console.log(taskks.length)
    let data = []
    taskks.forEach(element => {
        data.push(element)

    });
   // console.log(data[0][0].taskName)
    if (tasks.TaskList === 0) {
        return (
            <View>
                <Text>no task ,addtask</Text>
            </View>
        )
    }
    return (
        <View style={styles.Main}>
            <Text>jnjdnenke</Text>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    contentContainerStyle={{ width: width, height: height / 2 }}
                    data={data[0]}
                    keyExtractor={(item,index) => index}
                    renderItem={({ item, index }) => {
                        console.log(item.taskName)
                        return(<Task item={item}/>)
                    }}
                />
            </SafeAreaView>
        </View>
    )
}

export default TaskLists

const Task = ({ item }) => {
    console.log(item.taskName)
    const del = async()=>{
       await axios.put(`http://localhost:4000/projects/projDelete/${item._id}`,{"Parentkey":"TaskList"})
    }
    return (
        <View>
            <View style={{}}>
                <Text>{item.taskName}</Text>
                <Text>2:hours {"/n"}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity><Text>Update  </Text></TouchableOpacity>
                <br />
                <TouchableOpacity onPress={del}><Text>Delete</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Main: {
        alignItems: "center", justifyContent: "center",
    }
})

