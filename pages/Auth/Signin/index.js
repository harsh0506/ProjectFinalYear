import Image from 'next/image'
import React , {useEffect , useState} from 'react'
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router'

function Signup() {
  const router = useRouter()

  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    (Object.keys(formErrors).length === 0 && isSubmit )? router.push("/") : console.log("errors")
    
  };

  

 
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };


  return (
    <>
  <section className="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
  <div className="container py-2 h-100">
    <div className="row d-flex justify-content-center align-items-center h-90">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: "185px"}} alt="logo"/>
                  <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                </div>

                <form onSubmit={handleSubmit}>
                  <p>Please login to your account</p>

                  <div className="form-outline mb-4">
                  <TextField name='username' onChange={handleChange} value={formValues.username} className="form-control" id="outlined-basic" label="Outlined" variant="outlined" />
                  <p>{formErrors.username}</p>
                  </div>

                  <div className="form-outline mb-4">
                  <TextField name='email' onChange={handleChange} value={formValues.email}  className="form-control" id="outlined-basic" label="Outlined" variant="outlined" />
                  <p>{formErrors.email}</p>
                  </div>

                  <div className="form-outline mb-4">
                  <TextField name='password' onChange={handleChange} value={formValues.password}  className="form-control" id="outlined-basic" label="Outlined" variant="outlined" />
                  <p>{formErrors.password}</p>
                  </div>

                  <div className="text-center pt-1 mb-2 pb-1">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 " >Log
                      in</button>
                  </div>

                  <div className="d-flex align-items-center justify-content-center ">
                    <p className="mb-0 me-2">Have a Account?</p>
                    <button onClick={()=>router.push("/Auth/Login")} className="btn btn-outline-danger">Login now</button>
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

export default Signup