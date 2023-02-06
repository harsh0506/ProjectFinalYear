import { useState } from '@hookstate/core'
import { useRouter } from 'next/router'
import React from 'react'
import { usernameState, CurTeam } from '../../Helper/globeState'
import { Panel, Placeholder, Row, Col } from 'rsuite';
import axios from 'axios';
import { userDetailsIS, UserTeams } from '../../Helper/globeState/InitialStae';
import { Button, Modal, Input } from 'antd';

function Team() {
  const router = useRouter()
  const [userteams, setUserteams] = React.useState([UserTeams])
  const userDetails = useState(usernameState)
  const [user, setUser] = React.useState(userDetailsIS)

  React.useCallback(()=>getUserTeams(),[])

  console.log(userDetails.get())
  React.useEffect(() => {
    if (userDetails.get()._id.length === 0) { router.push("/") }
    else {
      setUser(userDetails.get())
      getUserTeams(userDetails.get()._id).then((res) => setUserteams(res.data))
    }
  }, [getUserTeams])



  return (
    <div class='container ' style={{ backgroundColor: "pink" }}>

      <AddTeam userId={user._id} />

      <Row class=" align-items-center justify-content-center">
        {
          userteams.map((item) => {
            return (
              <>
                <Col md={10} sm={12}>
                  <Card item={item} title={item.teamName} />
                </Col>
              </>
            )
          })
        }
      </Row>
    </div>
  )
}

export default Team

export function AddTeam({ userId }) {

  console.log(userId)

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [state, setState] = React.useState("")
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log(state)
    const data = {
      teamName: state,
      teamAdminID: userId,
      teamid: Math.random().toString(36).substring(2, 9),
      inviteCode: Math.random().toString(36).substring(2, 6)
    }
    console.log(data)

    CreateTeam( data).then(res => console.log(res))
    
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const CreateTeam = async (data) => {
    try {
      return (await axios.post(`http://localhost:4000/teams`, data)).data
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Team name" onChange={(e) => setState(e.target.value)} value={state} />;
      </Modal>
    </>
  )
}

const Card = props => {
  const CurUserTeam = useState(CurTeam)
  const router = useRouter()
  

  async function GoToTeamDetailPage() {
    CurUserTeam.set(props.item)
    await router.push({
      pathname: `/Team/Team/${props.item.teamName}`,
      query: {
        id: props.item.teamid
      }
    })
  }

  return (
    <>
      <Panel {...props} bordered onClick={GoToTeamDetailPage} style={{ margin: 8, minWidth: 300 }} header={props.title} >
        <p>enenen/fe</p>
        <div className="d-flex justify-content-evenly">
          {props.item.teamMembers.map(item => <p>1</p>)}

        </div>

      </Panel>
    </>

  );
}

export async function getUserTeams(id) {
  try {
    console.log(await axios.get(`http://localhost:4000/teams/getTeamUsingUSerId/${id}`))
    return await axios.get(`http://localhost:4000/teams/getTeamUsingUSerId/${id}`)
  } catch (error) {
    console.log(error)
  }
}
