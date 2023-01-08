//in this file we work with f=global state and their setting state function
//imports for creating global state object
import { hookstate } from '@hookstate/core';
import { UserTeams , UserProj , Task } from './InitialStae';
//state of user 
export const fireBaseLoginReturns = hookstate({
    userId:"",
    userEmail:""
})
//global state to set usermail and id
export const usernameState = hookstate({
    userEmail:"",
    userId:"",
    userName:"",
    profilepic:"",
    githubUrl:"",
    projects:[],
    Teams:[],
    _id:""
});

export const projectState = hookstate(UserProj)

export const CurTeam = hookstate(UserTeams)

export const UserTask = hookstate(Task)

export const userProjects = hookstate([
    UserTeams
])
//global state to store tasklist of user
export const taskListState = hookstate([])
//global state to store user data after login
export const currentUser = hookstate(false)