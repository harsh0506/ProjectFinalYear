import { useState } from '@hookstate/core'
import { useRouter } from 'next/router'
import React from 'react'
import { usernameState, CurTeam } from '../../Helper/globeState'
import { Panel, Placeholder, Row, Col } from 'rsuite';
import axios from 'axios';
import { UserTeams } from '../../Helper/globeState/InitialStae';


function Team() {
  const router = useRouter()
  const [userteams, setUserteams] = React.useState([UserTeams])
  const userDetails = useState(usernameState)
  React.useEffect(() => {
    if (userDetails.get()._id.length === 0) { router.push("/") }
    else {
      getUserTeams(userDetails.get()._id).then((res) => setUserteams(res.data))
    }
  }, [1])



  return (
    <div class='container ' style={{ backgroundColor: "pink" }}>
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

const Card = props => {
  const CurUserTeam = useState(CurTeam)
  const router = useRouter()

  async function GoToTeamDetailPage() {
    CurUserTeam.set(props.item)
    await router.push({
      pathname: `/Team/Team/${props.item.teamName}`,
      query: {
        tID:props.item.teamid
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
