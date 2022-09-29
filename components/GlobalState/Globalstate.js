//in this file we work with f=global state and their setting state function
//imports for creating global state object
import { createState } from '@hookstate/core';
//global state to set usermail and id
export const usernameState = createState({
    userEmail:"",
    userId:"",
    userName:"",
    profilepic:"",
    githubUrl:"",
    projects:[],
    Teams:[],
    _id:""
});

export const projectState = createState({
    userId:'',
    teamId:"",
    projectId:"",
    teamAdminId:"",
    Documents:[],
    projectName:"",
    submissionDate:"",
    TaskList:[],
    calender:[],
    activit:""
})

export const userProjects = createState([
    
])
//global state to store tasklist of user
export const taskListState = createState([])
//global state to store user data after login
export const currentUser = createState(false)