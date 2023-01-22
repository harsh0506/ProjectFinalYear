import React from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, FireTwoTone } from '@ant-design/icons';
import { Avatar, Card, Button, Modal, Input, Divider } from 'antd';
import { usernameState } from '../../Helper/globeState';
import { UserProj } from '../../Helper/globeState/InitialStae';
import { useHookstate } from '@hookstate/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProjectCreate from "../../Project/Create"

const { Meta } = Card;

function DisplayProjectList() {

    const UserDetails = useHookstate(usernameState)
    const [stae, setState] = React.useState([UserProj])
    const [PriorityIconColor, setPriorityIconColor] = React.useState("red")
    const router = useRouter()

    const get = React.useCallback(()=>getData(),[])

    React.useEffect(() => {
        try {
            console.log(UserDetails.get())
            if (UserDetails.get()._id === "") router.push("/")
            getData(UserDetails.get()._id).then(res => setState(res)).catch(err => console.log(err))
            console.log(stae)
        } catch (err) { console.log(err) }

    }, [getData])

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

    return (
        <>
            <div>

                <div className="container">
                    <ProjectCreate />
                </div>

                <Divider orientation="left" style={{ width: 100 }}>Personal Projects</Divider>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {
                        stae.map((ele) => {

                            return (
                                <div className="col" onClick={() => alert(ele._id)}>
                                    <Card
                                        style={{
                                            width: 300,
                                            backgroundColor: "Pink"
                                        }}

                                        actions={[
                                            <EditOutlined key="edit" onClick={() => handleNavigation(ele._id)} />,
                                            <DeleteOutlined key={"delete"} onClick={() => handleDelete(ele._id)} />,
                                            <EllipsisOutlined key="ellipsis" />,
                                        ]}
                                    >
                                        <Meta
                                            title={ele.projectName}
                                            description="This is the description"
                                        />

                                        {/*container 1*/}
                                        <div className="d-flex p-1 m-1 container">
                                            {/*SubmissionDate*/}
                                            <div className="row">
                                                <span>submission Date</span>
                                                <p>
                                                    {
                                                        `${new Date(ele.SubmissionDate).getDate()}/${new Date(ele.SubmissionDate).getMonth()+1}/${new Date(ele.SubmissionDate).getFullYear()}`
                                                    }
                                                </p>
                                            </div>
                                            {/*Priority*/}
                                            <div className="row">
                                                <span>priority</span>
                                                <FireTwoTone style={{ width: 5 }} twoToneColor={PriorityIconColor} />
                                            </div>
                                        </div>

                                        {/*container 2*/}
                                        <div className="d-flex p-1 m-1 container">
                                            {/*Remaining days
                                            the text color must change as per remianing days value i.e if small number then it can be red as date of submission is close and if number is big then it can be green to show we still time
                                            it is yet to implemet
                                            */}
                                            <div className="row">
                                                <span>remaining Days</span>
                                                <p>{
                                                    Math.round((new Date(ele.SubmissionDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) + 1
                                                }</p>
                                            </div>
                                        </div>


                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DisplayProjectList

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
        const data = (await axios.get(`http://localhost:4000/projects/${id}`)).data
        console.log(data)
        return data
    } catch (error) {

    }
}