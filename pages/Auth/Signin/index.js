import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
//you get auth object
import { app } from '../FirebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import axios from 'axios';
import { useRouter } from 'next/router';
import { useHookstate } from '@hookstate/core';
import { usernameState } from '../../Helper/globeState';
const auth = getAuth(app)

function App() {

    const router = useRouter()
    const UserDetail = useHookstate(usernameState)
    
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [gitUrl, setGitUrl] = React.useState("");
    const [username, setUsername] = React.useState("")
    const [error, setError] = React.useState("");

    const handleLogin = () => {
        if (!email || !password || !gitUrl || !username) {
            alert("Please enter all data")
            setError("Please enter all data");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address");
            setError("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            alert("Please enter a password with at least 6 characters");
            setError("Please enter a password with at least 6 characters");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
            try {
                const info = await axios.post("http://localhost:4000/user", {
                    "userName": username,
                    "userId": res.user.uid,
                    "profilepic": `https://api.dicebear.com/5.x/lorelei/svg?seed=${username}`,
                    "userEmail": res.user.email,
                    "githubUrl": gitUrl,
                })
                UserDetail.set(info.data[0])
                router.push("/")
            } catch (error) {
                setError(error)
            }

        }).catch((err) => console.log(err))

    };

    return (
        <>
            <MDBContainer fluid style={{
                height: "100vh", background: "#3b1b27", color: "#3b1b27"
            }}>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', border: "none", maxWidth: '500px' }}>
                            <MDBCardBody className='p-5 w-100 d-flex flex-column' >

                                <h2 className="fw-bold mb-2 text-center">Sign UP</h2>
                                <p className="text-black-50 mb-3" style={{ color: "black" }}>Please enter your login, password and giturl</p>

                                <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' style={{ color: "#3b1b27" }} onChange={(e) => setEmail(e.target.value)} type='email' size="lg" />
                                <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' onChange={(e) => setPassword(e.target.value)} type='password' size="lg" />
                                <MDBInput wrapperClass='mb-4 w-100' label='Username' id='formControlLg' style={{ color: "#3b1b27" }} onChange={(e) => setUsername(e.target.value)} type='username' size="lg" />
                                <MDBInput wrapperClass='mb-4 w-100' label='Git url' id='formControlLg' style={{ color: "#3b1b27" }} onChange={(e) => setGitUrl(e.target.value)} type='url' size="lg" />

                                <MDBBtn size='lg' onClick={handleLogin}>
                                    Sign Up
                                </MDBBtn>
                                <br />
                                <MDBBtn size='lg' style={{ background: "white", color: "blue" }} onClick={() => router.push("/Login")}>
                                    Already have accont? Login here
                                </MDBBtn>

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </>
    );
}

export default App;