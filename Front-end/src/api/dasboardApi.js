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

export const getTimeSeriesData = async(agentKey)=>{
    const res = await axios.get(`${BASE_URL}/timeseries`,{
        headers:{
            Authorization:`Agent ${agentKey}`
        }
    })
    return res.data

}
export const getSlowEndpoints = async(agentKey)=>{
      const res = await axios.get(`${BASE_URL}/slow`,{
        headers:{
            Authorization:`Agent ${agentKey}`
        }
    })
    return res.data
}

export const getErrors = async(agentKey)=>{
      const res = await axios.get(`${BASE_URL}/errors`,{
        headers:{
            Authorization:`Agent ${agentKey}`
        }
    })
    return res.data
}

export const getEndpoints = async(agentKey)=>{
      const res = await axios.get(`${BASE_URL}/endpoints`,{
        headers:{
            Authorization:`Agent ${agentKey}`
        }
    })
    return res.data
}
export const getInsightsAI = async(agentKey)=>{
      const res = await axios.get(`${BASE_URL}/insights`,{
        headers:{
            Authorization:`Agent ${agentKey}`
        }
    })
    return res.data
}