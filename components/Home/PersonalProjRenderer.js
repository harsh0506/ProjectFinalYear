import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height, width } from '../Dimentions/Dimensions'

const PersonalProjRenderer = ({ data, nav }) => {
    console.log(data)
    if (data.length === 0) {
        return (
            <View>

            </View>
        )
    }

    return (
        <View style={styles.Main}>
            <Text>PersonalProjRenderer</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.projectId}
                renderItem={({ item, index }) => (
                    <ListRenderer
                        onPress={() => nav.navigate("Project", item)}
                        res={item.projectName} />
                )}
            />
        </View>
    )
}

export default PersonalProjRenderer

const styles = StyleSheet.create({
    Main: {
        alignItems: "center", justifyContent: "center",
    }
})

export const ListRenderer = ({ res, onPress }) => {
    console.log(res)
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text>{res}</Text>
            </TouchableOpacity>
        </View>
    )
}