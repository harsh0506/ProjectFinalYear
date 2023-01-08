import Image from 'next/image'
import React  from 'react'
import TextField from '@mui/material/TextField';
import { LoginMethod } from '../Helper';
import { useRouter } from 'next/router';
import { fireBaseLoginReturns } from '../../globeState';
import { useHookstate } from '@hookstate/core';


function Login() {
  const router = useRouter()
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = React.useState(initialValues);
  const GlobalStateForUserIdFromFireBase = useHookstate(fireBaseLoginReturns)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formValues)
    const res = await LoginMethod(formValues.email, formValues.password)
    console.log(res)
    GlobalStateForUserIdFromFireBase.set({ userEmail: res[0], userId: res[1] })
    router.push({
      pathname: '/',
      query: { uid: res },
    })
  };


  return (
    <>
  <section class="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-4">

                <div class="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: "185px"}} alt="logo"/>
                  <h4 class="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                </div>

                <form onSubmit={handleSubmit}>
                  <p>Please login to your account</p>

                  <div class="form-outline mb-4">
                  <TextField name="email" class="form-control" onChange={handleChange} value={formValues.email} id="outlined-basic" label="Outlined" variant="outlined" />
                  </div>

                  <div class="form-outline mb-4">
                  <TextField name="password" class="form-control" onChange={handleChange} value={formValues.password} id="outlined-basic" label="Outlined" variant="outlined" />
                  </div>

                  <div class="text-center pt-1 mb-5 pb-1">
                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" >Log
                      in</button>
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <button onClick={()=>router.push("/Auth/Signin")} class="btn btn-outline-danger">Create new</button>
                  </div>

                </form>

              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 class="mb-4">We are more than just a company</h4>
                <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</>
  )
}

export default Login