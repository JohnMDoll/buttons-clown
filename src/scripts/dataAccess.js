const applicationState = {
    partyRequests: [],
    clowns: [],
    completions: []
}
const mainContainer = document.querySelector("#container")
const API = "http://localhost:8088"

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.clowns = data
            }
        )
}

export const deleteRequest = (id) => {
    return fetch(`${API}/partyRequests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
export const fetchRequests = () => {
    return fetch(`${API}/partyRequests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.partyRequests = serviceRequests
            }
        )
}
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (serviceCompletions) => {
                // Store the external state in application state
                applicationState.completions = serviceCompletions
            }
        )
}

export const getRequests = () =>{
    let requestsCopy = structuredClone(applicationState.partyRequests)
    return requestsCopy 
}

export const getClowns = () =>{
    let clownsCopy = structuredClone(applicationState.clowns)
    return clownsCopy 
}
export const getCompletions = () =>{
    let completionsCopy = structuredClone(applicationState.completions)
    return completionsCopy 
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/partyRequests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
export const sendCompletion = (completedServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedServiceRequest)
    }
    
    fetch(`${API}/partyRequests/${completedServiceRequest.requestId}`, { method: "DELETE" })
   
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
