import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { projectState, usernameState } from '../GlobalState/Globalstate'
import { createState, useState } from '@hookstate/core';
import { set } from "../firebase/Crud"
import axios from 'axios';
const AddTask = () => {
    const state = useState(projectState)
    const [taskName, setTaskName] = React.useState("")
    const [progress, setProgress] = React.useState("0%")
    const [submissionDate, setSubmissionDate] = React.useState("15-09-22")
    let res1 = state.get().projectId
    let taskId = Math.random().toString(36).slice(7)
    const data = {
        "TaskList": {
            taskName,
            userId:"hdknficw38t4ubifr20#7din ",
            progress, submissionDate,
            dateOfCreation: Date.now(),
            taskId
        }
    }
    const setdata = async () => {
        try {
            const res = await axios.put(`http://localhost:4000/projects/arrAdd/${res1}`,data)
            console.log(res)
        } catch (error) { console.log(error) }
    }
    return (
        <View>
            <Text>AddTask</Text>
            <View>
                <TextInput
                    placeholder='add task'
                    value={taskName}
                    onChangeText={setTaskName}
                />
                <Button title='click' onPress={setdata} />
            </View>
        </View>
    )
}

export default AddTask

const styles = StyleSheet.create({})