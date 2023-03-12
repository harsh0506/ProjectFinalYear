import { useHookstate } from '@hookstate/core'
import axios from 'axios'
import React from 'react'
import { usernameState } from '../Helper/globeState'
import { Panel, Placeholder, Row, Col } from 'rsuite';
import { UserProj } from '../Helper/globeState/InitialStae';
import { useRouter } from 'next/router';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, FireTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Modal, Input, Divider, Tooltip } from 'antd';

function index({ user }) {
  const UserDetails = useHookstate(usernameState)
  const [stae, setState] = React.useState([UserProj])
  const [err, setError] = React.useState()
  console.log(UserDetails.get()._id)
  console.log(user)

  React.useEffect(() => {
    getData(UserDetails.get()._id).then(res => setState(res)).catch(err => setError(err))
  }, [])

  return (
    <>
      <div className="" style={{
        background: "#3b1b27",
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        padding: 10
      }}>
        <div className="container" style={{
          textAlign: "left",
          display: "flex"
        }}>
          <h2 style={{
            color: "#fffffe",
            fontWeight: 600,
            fontSize: 45,
            padding: 10,
            marginBottom: 10
          }}>Personal Projects</h2>

        </div>


        <Divider orientation="left" style={{ width: 100, color: "pink", display: "flex", flexDirection: "row" }}>
          <p style={{ marginRight: 5 }}>Personal Project
            <Tooltip title="You can only make 3 Projects">
              <InfoCircleOutlined style={{ marginLeft: 15 }} />
            </Tooltip>
          </p>
        </Divider>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {
            stae.map((ele) => {
              return (<Cardcomp ele={ele} />)
            })
          }
        </div>
      </div>

    </>
  )
}

export default index

export async function getData(id) {
  try {
    return (await axios.get(`http://localhost:4000/projects/${id}`)).data
  } catch (error) {
    console.log(error)
  }
}


export function Cardcomp({ ele }) {
  const router = useRouter()
  const [cardcol, setCardcol] = React.useState("#120609")

  async function handleNavigation(id) {
    try {
      await router.push({
        pathname: `/Project/${id}`,
        query: {
          id: id
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const RD = Math.round((new Date(ele.SubmissionDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) + 1

  return (
    <div className="col" style={{
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    }}>

      <Card
       //onClick={() => handleNavigation(ele._id)}
        onMouseOver={() => setCardcol("#230a10")}
        onMouseOut={() => setCardcol("#120609")}

        actions={[
          <SettingOutlined key="setting" onMouseOver={()=>setCardcol("#230a10")} />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key="ellipsis" onClick={()=>{
            delProj(ele._id)
          }} />,
        ]}

        style={{
          width: 300,
          background: cardcol,
          border: "none",
          borderRadius: "20px"
        }}
      >
        <p style={{
          color: "#ffb5d2",
          fontSize: 25,
          fontWeight: 500,
        }}>
          {ele.projectName}
        </p>

        {/*container 1*/}
        <div className="d-flex p-1 m-1 container">

          <div className="row" style={{
            width: 180
          }}>
            <span style={{
              color: "#fffffe",
              fontWeight: 300,
              fontSize: 20
            }}>remaining Days</span>
            <p style={{
              color: RD < 10 ? "red" : "green",
              fontSize: 22,
              fontWeight: 400
            }}>{RD}</p>
          </div>

          {/*Priority*/}
          <div className="row">
            <span style={{
              color: "#fffffe",
              fontWeight: 300,
              fontSize: 20
            }}
            >priority</span>
            <FireTwoTone style={{ width: 23, padding: 3, }} />
          </div>

        </div>

      </Card>
    </div>)
}


async function delProj(projId) {
  try {
    
    const res = await axios.delete(`http://localhost:4000/projects/${projId}`)
    alert(projId)
  } catch (error) {
    console.log(error)
  }
}