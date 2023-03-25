import React from "react";
import { initializeApp } from "firebase/app";
//firestore
import { getFirestore, collection, serverTimestamp, query, orderBy, limit, addDoc, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, Modal, Avatar } from "antd";
import { useHookstate } from "@hookstate/core";
import { getAuth } from "firebase/auth";

import { app, firebaseConfig } from "../../Auth/FirebaseConfig"
import { useRouter } from "next/router";
import { usernameState } from "../../Helper/globeState";

const firestore = getFirestore(app);

export default function Chat(props) {

    const teamID = props.teamId

    const [state, setState] = React.useState({
        uid: "",
        photoURL: "",
        teamId: ""
    })

    const user = useHookstate(usernameState)

    React.useState(() => {
        setState({
            teamId: String(teamID),
            uid: user.get().userId,
            photoURL: user.get().profilepic
        })
    })
    return (<div className="App">
        <Chatroom state={state} />
    </div>);
}

export function Chatroom({ state }) {
    const { uid, photoURL, teamId } = state;
    const [isModalOpen, setIsModalOpen] = React.useState(true);
    const showModal = (ele) => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const messageQuery = query(
        collection(firestore, "messages"),
        where("teamId", "==", teamId),
        orderBy("createdAt"),
        limit(25),
    );

    const [value, loading, error] = useCollectionData(messageQuery);

    console.log(value)

    const dummy = React.useRef();

    const [formValue, setformValue] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(uid, photoURL)

        await addDoc(collection(firestore, "messages"), {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoURL,
            teamId
        });

        setformValue("");

        dummy.current.scrollIntoView({
            behavior: "smooth"
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    


    return (
        <>
            <>
                <Button type="primary" onClick={showModal}>
                    Group Chat
                </Button>
                <Modal title="Group Chat Message" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{
                    height: 400, background: "pink"
                }}>
                    <div className="chat-container" style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        {Array.isArray(value) === true ? value.map((msg) => (
                            <div className="chat-messages" style={{
                                overflowY: "scroll",
                                maxHeight: 500
                            }}>
                                <ChatMessage key={msg.id} message={msg} Uid={uid} />
                            </div>
                        )) : <p>No text</p>}
                        <div ref={dummy}></div>
                        <form style={{
                            display: "flex",
                            alignItems: "center",
                            position: "sticky",
                            bottom: 0,
                            background: "#f0f0f0",
                            padding: 10,
                        }} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={formValue}
                                placeholder="type ..."
                                style={{
                                    flex: 1,
                                    height: 30,
                                    marginRight: 10,
                                    border: "none",
                                    outline: "none",
                                }}
                                onChange={(e) => setformValue(e.target.value)}
                            />
                            <button style={{
                                height: 30,
                                padding: "0 10px",
                                border: "none",
                                background: "#2196f3",
                                color: "white",
                                cursor: "pointer",
                            }} type="submit">send</button>
                        </form>
                    </div>

                </Modal>
            </>
        </>
    );
}

export function ChatMessage(props) {
    const { text, uid, photoURL, teamId, createdAt } = props.message;
    const Uid = props.Uid
    const Time = new Date(createdAt.toDate()).toISOString().slice(0, 16) || ""
    const messageClass = uid === Uid ? "sent" : "recieved";

    return (
        <div style={{
            display: "flex",
            alignItems: messageClass === "sent" ? "end" : "start",
            flexDirection: "column",
            padding: 10,
            marginBottom: 10
        }} >
            <div style={{
                display: "flex",
                alignItems: "center",
                flexDirection: messageClass === "sent" ? "row" : "row-reverse"
            }}>
                <img src={photoURL} alt="profile" />
                <p style={{
                    color: "black",
                    background: "#0b93f6",
                    alignSelf: "flex-end",
                }}>{text}</p>
            </div>
            <div >
                <span>{Time}</span>
            </div>
        </div>
    );
}