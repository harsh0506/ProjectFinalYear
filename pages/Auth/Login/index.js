{
  /*
  
  import { useHookstate } from '@hookstate/core';
  import { usernameState , fireBaseLoginReturns } from '../../Helper/globeState';

  const GlobalStateForUserIdFromFireBase = useHookstate(fireBaseLoginReturns)

  GlobalStateForUserIdFromFireBase.set({ userEmail: res[0], userId: res[1] })
    router.push({
      pathname: '/',
      query: { uid: res },
    })

  */
}

import React from 'react';
import { useHookstate } from '@hookstate/core';
import { usernameState, fireBaseLoginReturns } from '../../Helper/globeState';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
}
  from 'mdb-react-ui-kit';
//you get auth object
import { app } from './Chat';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import { useRouter } from 'next/router';

const auth = getAuth(app)

function Login() {

  const router = useRouter();
  const GlobalStateForUserIdFromFireBase = useHookstate(fireBaseLoginReturns);
  const UserDetail = useHookstate(usernameState)

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password")
      setError("Please enter your email and password");
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

    const data = await signInWithEmailAndPassword(auth, email, password)

    try {
      const res = await (await axios.get(`http://localhost:4000/user/${data.user.uid}`)).data[0]
      GlobalStateForUserIdFromFireBase.set({ userEmail: data.user.email, userId: data.user.uid })
      UserDetail.set(res)
      router.push({
        pathname: '/',
        query: { uid: data.user.uid },
      })
     
    } catch (error) {
      console.log(error)
    }
  };

  const SIWG = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      const userData = {
        userId: user.user.uid,
        userEmail: user.user.email,
        userName: user.user.displayName,
        userImage: user.user.photoURL
      }

      return userData
    } catch (error) {
      setError(error)
    }

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

                <h2 className="fw-bold mb-2 text-center">Log in</h2>
                <p className="text-white-50 mb-3">Please enter your login and password!</p>

                <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' style={{ color: "#3b1b27" }} onChange={(e) => setEmail(e.target.value)} type='email' size="lg" />
                <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' onChange={(e) => setPassword(e.target.value)} type='password' size="lg" />

                <MDBBtn size='lg' onClick={handleLogin}>
                  Login
                </MDBBtn>
                <br />
                <MDBBtn size='lg' style={{ background: "white", color: "blue" }} onClick={() => router.push("/SignUp")}>
                  No Account? Create one
                </MDBBtn>

                <hr className="my-4" />

                <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }} onClick={SIWG}>
                  <MDBIcon fab icon="google" className="mx-2" />
                  Sign in with google
                </MDBBtn>

              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </>
  );
}

export default Login;