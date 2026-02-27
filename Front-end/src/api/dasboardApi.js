import axios from "axios";

const BASE_URL = "http://localhost:5000/dashboard";

export const getSummary = async(agentKey)=>{
     
    const res = await axios.get(`${BASE_URL}/summary`,{
        headers:{
            Authorization:`Agent ${agentKey}`
        }
    })
    return res.data
}