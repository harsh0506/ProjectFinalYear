import axios from "axios"


export async function userInfo(email) {
    try {
        const d = await axios.get(`http://localhost:4000/user/userName/${email}`)
        axios.get(`http://localhost:4000/user/userName/${email}`)
            .then(user => {
                console.log(user.data)
                console.log(user.data[0]._id)
            })
            .catch(err => { console.log(err) })
        return d.data    
    }
    catch (err) { console.log(err) }
}