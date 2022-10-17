import { getClowns, getRequests, getCompletions, sendCompletion } from "./dataAccess.js";
import { PartyForm } from "./PartyForm.js";
import { Requests } from "./Requests.js";

export const ButtonsClown = () =>{
    return `
    <h1 class="welcome">Clown Parties With Buttons & Lollipop</h1>
    <section class="request__form">Party Request Form:
    ${PartyForm()}
    </section>
    <section class="requests">
    ${Requests()}
    </section>
    `
}