import { useHookstate } from '@hookstate/core'
import axios from 'axios'
import React from 'react'
import { usernameState } from '../Helper/globeState'
import { Panel, Placeholder, Row, Col } from 'rsuite';
import { UserProj } from '../Helper/globeState/InitialStae';
import { useRouter } from 'next/router';

function index() {
  const UserDetails = useHookstate(usernameState)
  const [stae, setState] = React.useState([UserProj])
  console.log(UserDetails.get()._id)
  React.useEffect(() => {
    getData(UserDetails.get()._id).then(res => setState(res)).catch(err => console.log(err))
  }, [])

  return (
    <>
    <div className="container">
      <p>projects</p>
    <Row class="d-flex align-items-center justify-content-center">
        {
          stae.map((ele) => (<>
            <Col md={10} sm={12}>
              <Card title={"hello"} ele={ele} id={ele._id} />
            </Col>
          </>))

        }

      </Row>
    </div>
      
    </>
  )
}

export default index

export async function getData(id) {
  try {
    return (await axios.get(`http://localhost:4000/projects/${id}`)).data
  } catch (error) {

  }
}


const Card = props => {
  const router = useRouter()
  async function gotoProject() {
    await router.push({
      pathname: `/Project/${props.id}`,
      query: {
        id: props.id
      }
    })
  }
  return (
    <Panel {...props} onClick={gotoProject} bordered style={{ margin: 8, minWidth: 300 }} header={props.title} >
      <p>{props.ele.projectName}</p>
    </Panel>
  );
}