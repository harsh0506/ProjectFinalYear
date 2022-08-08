import * as DocumentPicker from "expo-document-picker";
import { uploadBytes, ref, listAll, getDownloadURL, getStorage } from 'firebase/storage';
import { storage } from "./firebase/FirebaseConfig";

export function EmailValidation(email){
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    
}

export async function UploadDocs(projectId){
    let res = await DocumentPicker.getDocumentAsync({})
        const res2 = await fetch(res.uri)
        const converted_to_blob = await res2.blob()
        const storageRef = ref(storage, `${projectId}/${res.name}`)
        uploadBytes(storageRef, converted_to_blob).then((snapshot) => {
            getDownloadURL(snapshot.ref)
            .then(url => console.log(url))
            .catch(err => console.log(err))
        });
}

export const ListItems = (projectId) => {
    const listRef = ref(storage, `${projectId}`);
    let Filesinfo = []
    listAll(listRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                console.log(itemRef.name)
            });
        }).catch((error) => {
            console.log(error)
        });
    console.log(Filesinfo)
}