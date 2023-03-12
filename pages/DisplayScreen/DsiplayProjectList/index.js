import React from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, FireTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Modal, Input, Divider } from 'antd';
import { usernameState } from '../../Helper/globeState';
import { UserProj } from '../../Helper/globeState/InitialStae';
import { useHookstate } from '@hookstate/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProjectCreate from "../../Project/Create"
import { Tooltip } from 'antd';


const { Meta } = Card;

function DisplayProjectList({user}) {

    const UserDetails = useHookstate(usernameState)
    const [stae, setState] = React.useState([UserProj])
    const [TProj, setTeamProj] = React.useState([UserProj])
    const [PriorityIconColor, setPriorityIconColor] = React.useState("red")
    const router = useRouter()
    const [cardcol, setCardcol] = React.useState("rgb(30 50 114)")

    React.useEffect(() => {
        try {
            console.log(user)
            if (UserDetails.get()._id === "") router.push("/")
            getData(UserDetails.get()._id).then(res => { setState(res[0]); setTeamProj(res[1]) }).catch(err => console.log(err))
            console.log(UserDetails.get())
        } catch (err) { console.log(err) }

    }, [TProj])



    return (
        <>
            <div style={{
                height: "87vh",
                background: "#3b1b27"
            }}>

                <div className="container" style={{
                    textAlign: "left",
                    display: "flex"
                }}>
                    <h2 style={{
                        color: "#fffffe",
                        fontWeight: 600,
                        fontSize: 45
                    }}>Projects</h2>

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
                     !Array.isArray(stae)  ? <p>No Projects</p> : stae.map((ele) => {
                            return (<Cardcomp ele={ele} />)
                        }) 
                    }
                </div>

                <Divider orientation="left" style={{ width: 100, color: "pink", display: "flex", flexDirection: "row" }}>
                    <p style={{ marginRight: 5 }}>Team Project
                        <Tooltip title="You can only make 3 Projects">
                            <InfoCircleOutlined style={{ marginLeft: 15 }} />
                        </Tooltip>
                    </p>
                </Divider>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    { 
                        !Array.isArray(TProj)  ? <p>No Projects</p> : TProj.map((ele) => {
                            return (<Cardcomp ele={ele} />)
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default DisplayProjectList

export function Cardcomp({ ele }) {
    const router = useRouter()
    const [cardcol, setCardcol] = React.useState("#120609")

    async function handleNavigation(id) {
        try {
            await router.push({
                pathname: `/Project/${id}`,
                query: { id }
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
                onClick={() => handleNavigation(ele._id)}
                onMouseOver={() => setCardcol("#230a10")}
                onMouseOut={() => setCardcol("#120609")}

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

export async function handleDelete(id) {
    try {
        const data = axios.delete(`http://localhost:4000/projects/${id}`)
        alert(data)
    } catch (error) {
        alert(error)
    }
}

export async function getData(id) {
    try {
        const d = (await axios.get(`http://localhost:4000/projects/projects/${id}`)).data
        console.log( [d.personal, d.personal])
        return [d.personal, d.personal]
    } catch (error) {

    }
}