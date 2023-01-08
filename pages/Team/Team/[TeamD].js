import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { CurTeam } from '../../Helper/globeState'
import { Cascader } from 'rsuite'
import { Panel, Placeholder, Row, Col } from 'rsuite';

function TeamDetail(props) {
  //getUserTeams(CurTeam.get().teamid).then((data)=>console.log(data))
  const router = useRouter()
  
  let teamMem = []
  
  getUserTeams(router.query.tID)
  .then((data) => {
    teamMem = data
  });

  return (
    <div className='container my-4'>
      <Cascader data={teamMem} placeholder="team Members" />
      {
        ProjectsList.map((item) => {
          return (
          <>
           <p>{item}</p>
          </>)
        })
      }
    </div>

  )
}

export default TeamDetail

export async function Card({ item }) {
  return (<>
    <Panel {...props} bordered onClick={GoToTeamDetailPage} style={{ margin: 8, minWidth: 300 }}  >
      <p>{string(item)}</p>
    </Panel>
  </>)
}

export async function getUserTeams(id) {
  try {
    const {teamdata, teamMember, Projects} = await (await axios.get(`http://localhost:4000/teams/${id}`)).data
    console.log(teamMember)
    let teamMembers = []
    
    await teamMember.forEach(element => {
       teamMembers.push({value:element[0].userName , label:element[0].userName })
    });
    return teamMembers
  } catch (error) {
    console.log(error)
  }
}

/*const teamMem = [{ value: "harsh", label: "harsh" },
{ value: "raju", label: "raju" },
{ value: "vishal", label: "vishal" },
] */
const ProjectsList = ["proj1", "proj2", "proj3"]

