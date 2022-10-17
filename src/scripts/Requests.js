import { getRequests, deleteRequest, getClowns, sendCompletion } from "./dataAccess.js"

const requestsStuffToMapForHTML = (request) => {

    const clowns = getClowns()
    return `
     <li id="request--${request.id}">${request.childName} at ${request.address}, ${request.partyDate}   
     <select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${clowns.map(
        clown => {
            return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
        }
    ).join("")
        }
</select><button class="request__delete" id="request__${request.id}">Delete</button></li>`
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request__")) {
        const [, requestId] = click.target.id.split("__")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [requestId, clownId] = event.target.value.split("--")
            for (const request of getRequests()) {
                if (request.id === parseInt(requestId)) {
                    const completion = {
                        parentName: request.parentName,
                        childName: request.childName,
                        headcount: request.headcount,
                        address: request.address,
                        partyDate: request.partyDate,
                        partyHours: request.partyHours,
                        requestId: requestId,
                        clownId: clownId,
                        completedDate: Date.now()
                    }
                    sendCompletion(completion)
                }
            }
        }
    }
)

export const Requests = () => {
    const requests = getRequests()

    let html = `

        <ul>
        <div class="ul"><a></a><a>Requests:</a><a>Clown Picker:</a><a>Reject:</a></div>
            ${requests.map(requestsStuffToMapForHTML).join("")
        }
        </ul>
    `

    return html
}