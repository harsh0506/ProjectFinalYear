export const userDetailsIS = {
    userEmail: "",
    userId: "",
    userName: "",
    profilepic: "",
    githubUrl: "",
    projects: [],
    Teams: [],
    _id: ""
}

export const UserTeams = {
    teamName: "",
    teamid: "",
    teamAdminId: "",
    userName: "",
    teamMembers: [],
    inviteCode: "",
    projectList: [],
    _id: " "
}

export const Task = {
    _id: "",
    taskName: "",
    priority: "",
    userId: "",
    userName: "",
    SubmissionDate: "",
    progress: "0",
    dateOfCreation: "",
    taskId: (Math.random() + 1).toString(36).substring(7)
}

export const document = {
    url: "",
    docName: "",
    tag: "",
    adderId: "",
    date: ""
}

export const UserProj = {
    userId: '',
    teamId: "",
    status: "",
    projectId: "",
    teamAdminId: "",
    Documents: [document],
    projectName: "",
    SubmissionDate: "",
    TaskList: [Task],
    calender: [],
    activit: "",
    priority: "",
    personal: true,
    dateOfCreation: "",
    _id: ""
}

export const Proj = {
    teamId: "",
    projectId: String((Math.random() + 1).toString(36).substring(7)),
    teamAdminId: "",
    projectName: "",
    SubmissionDate: "",
    personal: true,
    dateOfCreation: String(new Date()),
    priority: "",
}