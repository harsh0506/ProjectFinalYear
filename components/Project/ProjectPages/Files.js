import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as DocumentPicker from "expo-document-picker";

import { uploadBytes, ref, listAll, getDownloadURL, getStorage } from 'firebase/storage';
import { app, storage } from '../../firebase/FirebaseConfig';
import { downloadData, ListItems, UploadDocs } from '../../Helper';
import { useState } from '@hookstate/core';
import { projectState } from '../../GlobalState/Globalstate';

const UploadImg = ({ projDetail }) => {
    const ProjectState = useState(projectState)
    console.log(ProjectState.get().Documents)
    let projId = "oel7p"
    const [fileInfo, setFileInfo] = React.useState({
        fileType: "",
        fileName: "",
        fileUri: "",
    })
    const [downloadData, setDownloadData] = React.useState([])
    React.useEffect(async () => {
        const m = ListItems(projId)
        console.log(m)
    }, [])
    let adderId = "HB9NyODKMPYImstDR0pcROImoFa2"

    return (
        <View>
            <TouchableOpacity onPress={() => { UploadDocs(projId, adderId) }}
                style={{ backgroundColor: "blue" }}
            >
                <Text>index</Text>

            </TouchableOpacity>

            <ListOfDocs data={ProjectState.get().Documents} />
        </View>
    )
}

export default UploadImg

const styles = StyleSheet.create({
    alignItems: "center", justifyContent: "center",
})


export const ListOfDocs = ({ data }) => {
    console.log(data)
    return (
        <View style={styles.Main}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    keyExtractor={(item) => item._id}
                    data={data}
                    renderItem={({ item, index }) => (
                        <View >
                            <Text>{item.docName}</Text>
                            <Text>{item.url}</Text>
                            <TouchableOpacity onPress={() => { downloadData(item.url , item.docName) }}>
                                <Text>download</Text>
                            </TouchableOpacity>
                        </View>

                    )}
                />
            </SafeAreaView>

        </View>
    )
}