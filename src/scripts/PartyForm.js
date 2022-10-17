import { getClowns, getRequests, getCompletions } from "./dataAccess.js";

import { sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const parentName = document.querySelector("input[name='parent__name']").value
        const childName = document.querySelector("input[name='child__name']").value
        const headcount = document.querySelector("input[name='headcount']").value
        const partyAddress = document.querySelector("input[name='party__address']").value
        const partyDate = document.querySelector("input[name='party__date']").value
        const partyHours = document.querySelector("input[name='party__hours']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: parentName,
            childName: childName,
            headcount: headcount,
            address: partyAddress,
            partyDate: partyDate,
            partyHours: partyHours
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})

export const PartyForm = () => {
    let html = `
            <div class="field">
                <label class="label" for="parent__name">Name of Parent</label>
                <input type="text" name="parent__name" class="input" />
            </div>
            <div class="field">
                <label class="label" for="child__name">Name of Child</label>
                <input type="text" name="child__name" class="input" />
            </div>
            <div class="field">
                <label class="label" for="party__address">Address</label>
                <input type="text" name="party__address" class="input" />
            </div>
            <div class="field">
                <label class="label" for="headcount">How many will attend the party?</label>
                <input type="number" name="headcount" class="input" />
            </div>
            <div class="field">
            <label class="label" for="party__date">Date of the party?</label>
            <input type="date" name="party__date" class="input" />
            </div>
            <div class="field">
                <label class="label" for="party__hours">How many hours will the party last?</label>
                <input type="number" name="party__hours" class="input" />
            </div>
    
            <button class="button" id="submitRequest">Submit Request</button>
        `

    return html
}
