export const loginTutor = (clientId) =>{
    console.log(clientId)
    return(dispatch)=>{
        dispatch({
            type: 'tutor',
            payload: clientId
        })
    }
}



export const loginAdmin = (clientId) =>{
    console.log(clientId)
    return(dispatch)=>{
        dispatch({ 
            type: 'admin',
            payload: clientId
        })
    }
}


export const loginStudent = (clientId) =>{
    console.log(clientId)
    return(dispatch)=>{
        dispatch({
            type: 'student',
            payload: clientId
        })
    }
}