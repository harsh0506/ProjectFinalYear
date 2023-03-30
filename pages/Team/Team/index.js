import { useHookstate, useState } from '@hookstate/core'
import { useRouter } from 'next/router'
import React from 'react'
import { usernameState, CurTeam } from '../../Helper/globeState'
import { Panel, Placeholder, Row, Col } from 'rsuite';
import axios from 'axios';
import { userDetailsIS, UserTeams } from '../../Helper/globeState/InitialStae';
import { Button, Modal, Input , Tooltip } from 'antd';
import ProjCreate from "../../Project/Create"

function Team() {
  const router = useRouter()
  const [userteams, setUserteams] = React.useState([UserTeams])
  const userDetails = useHookstate(usernameState)
  const [user, setUser] = React.useState(userDetailsIS)
  const [err, setError] = React.useState()

  React.useEffect(() => {
    if (userDetails.get()._id.length === 0) { router.push("/") }
    else {
      setUser(userDetails.get())
      getUserTeams(userDetails.get()._id).then((res) => setUserteams(res.data)).catch(err => setError(err.message))
    }
  }, [])

  if (err) {
    return <>
      <div className="container" style={{
        height: "87vh",
        background: "#3b1b27",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }} >

        <h2 style={{
          color: "#fffffe",
          fontWeight: 600,
          fontSize: 45
        }}>Some Error happend</h2>

        <div className="container" style={{
          textAlign: "left",
          display: "flex"
        }}>
          <Button style={{
            color: "#3b1b27",
            background: "#fffffe",
          }} onClick={() => router.push("/")}>Go to Home page</Button>
        </div>

      </div>
    </>
  }

  return (
    <div class=' ' style={{
      background: "#3b1b27",
      height:"100vh",
      width:"100vw"
    }}>

      <div className="container" style={{
        textAlign: "left",
        display: "flex"
      }}>
        <h2 style={{
          color: "#fffffe",
          fontWeight: 600,
          fontSize: 45
        }}>Teams </h2>

      </div>

      {
        (Array.isArray(userteams)) && userteams.length >= 3 ? <>You only can have 3 teams , delete one to add a new</> : <AddTeam userId={user._id} />
      } 

      <Row class=" align-items-center justify-content-center" style={{
        background: "#3b1b27"
      }}>
        {
           Array.isArray(userteams) === false ? <div className="container" style={{
            textAlign: "left",
            display: "flex"
          }}>
            <h4 style={{
              color: "#fffffe",
              fontWeight: 600,
              fontSize: 45
            }}>No Teams</h4>

          </div>
            : userteams.map((item) => {
              return (
                <>
                  <Col style={{
                    width:300 , padding:10 , margin:10
                  }} md={10} sm={12}>
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

    CreateTeam(data).then(res => console.log(res))

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
        Create Team
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
  const [cardcol, setCardcol] = React.useState("#120609")
  const NOTM = props.item.teamMembers.length

  async function GoToTeamDetailPage() {
    CurUserTeam.set(props.item)
    await router.push({
      pathname: `/Team/Team/${props.item.teamName}`,
      query: {
        id: props.item.teamid,
        team_id : props.item._id
      }
    })
  }

  return (
    <>
      <Panel {...props}
        onMouseOver={() => setCardcol("#230a10")}
        onMouseOut={() => setCardcol("#120609")}
        onClick={GoToTeamDetailPage}
        style={{  padding:10 , margin:10, width: 300, background: cardcol }}>

        <div className="container" style={{
          textAlign: "left",
          display: "flex",flexDirection:"column"
        }}>
          <h4 style={{
            color: "#fffffe",
            fontWeight: 600,
            fontSize: 45
          }}>{props.item.teamName}</h4>
          <p style={{
            color: "#fffffe",
            marginRight: 5,
            fontSize: 25
          }}> No. of Team Memmbers
            <Tooltip title="You can only have maximum of 3 teamMembers">
              {NOTM === 0 ? <p style={{
                color: "#fffffe",
                marginRight: 5,
                fontSize: 25
              }}>No memebers in teams</p> : <p
                style={{
                  color: "#fffffe",
                  marginRight: 5,
                  fontSize: 25
                }}
              >{NOTM}</p>}
            </Tooltip>
          </p>


        </div>

        <div className="container" style={{
          textAlign: "left",
          display: "flex"
        }}>
          <Button onClick={() => delTeam(props.item._id)}>Delete Team</Button>
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

export async function delTeam(id) {
  try {
    const data = await axios.delete(`http://localhost:4000/teams/${id}`)
    alert("deleted the team")
  } catch (error) {
    console.log(error)
  }
}