import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { usernameState } from '../Helper/globeState';
import { useHookstate } from '@hookstate/core';
import { userDetailsIS } from '../Helper/globeState/InitialStae';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Profile() {
  const router = useRouter();
  const [state, setState] = React.useState(userDetailsIS)

  const user = useHookstate(usernameState)
  React.useEffect(() => {
    user.get()._id=== "" ? router.push("/") : setState(user.get())
     
  }, [])


  return (
    <>
      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
                  <MDBCol md="4" className="gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <MDBCardImage src={state.profilepic}
                      alt="Avatar" className="my-5" style={{ width: '100px' ,borderRadius: "50%" }} fluid />
                    <MDBTypography tag="h5" style={{color:"black"}}>{state.userName}</MDBTypography>
                    <MDBCardText style={{color:"black"}}>Web Designer</MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                         <MDBTypography tag="h6">Email</MDBTypography>
                         <Link href={`mailto :${state.userEmail}}`}><MDBCardText className="text-muted">{state.userEmail}</MDBCardText></Link> 
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Git Url</MDBTypography>
                          <MDBCardText className="text-muted">{state.githubUrl}</MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <div className="d-flex justify-content-start">
                        <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  )
}

export default Profile