
import axios from "axios";

export const RegServices = async(userData)=>{
    console.log("userDatauserData=",userData);
    return await axios.post('http://localhost:5000/user/addUser',userData)
}

export const user = async(userData)=>{
    return await axios.post('http://localhost:5000/user/login',userData)
}

export const GetData = async()=>{
    return await axios.get('http://localhost:5000/user/Users')
}

export const UpdateData =async(id,userData)=>{
    return await axios.put(`http://localhost:5000/user/EditData/${id}`,userData)
}

// export const ViewData = async(id)=>{
//     console.log("view data id=",id);
//     return await axios.get(`http://localhost:5000/user/ViewData/${id}`)
// }

export const deletData = async(id)=>{
    return await axios.put(`http://localhost:5000/user/DeleteData/${id}`)
}
