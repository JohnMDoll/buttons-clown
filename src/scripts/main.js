import { fetchClowns, fetchRequests, fetchCompletions } from "./dataAccess.js";
import { ButtonsClown } from "./frontAssembler.js";
import { PartyForm } from "./PartyForm.js";

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchClowns())
            .then(() => fetchCompletions())
                .then(
                    () => {
                        mainContainer.innerHTML = ButtonsClown()
                    }
                )
}
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
render()
