function createElements(){

    let title = document.createElement("h1");
    title.id = "title";
    title.textContent = "Actualizar estado del incidente";

    let input_id = document.createElement("input");
    input_id.id = "input_id";
    input_id.placeholder = "Ingrese el ID del incidente:";
    input_id.type = "number"; 

    let input_status = document.createElement("input");
    input_status.id = "input_status";
    input_status.placeholder = "Ingrese el estado del incidente:";
    input_status.type = "number"; 

    let update_button = document.createElement("button");
    update_button.id = "update_button";
    update_button.textContent = "Actualizar";

    document.appendChild(title);
    document.appendChild(input_id);
    document.appendChild(input_status);
    document.appendChild(update_button);

}

function addStyle(){

}

function updateStatus(id, incident_status){
    fetch(`http://localhost:3000/incidents/${id}`, {
        method: "PUT",

        body: JSON.stringify({
            status: incident_status,
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    .then(response => response.json())
    .then(data => {
        console.log(`Estado del incidente ID ${id} actualizado!`, data);
    })
    .catch(error => {
        console.error("Error al actualizar estado", error);
    });
}

function main (){

    createElements();
    addStyle();

    let input_id = document.getElementById("input_id");
    let input_status = document.getElementById("input_status");
    let button = document.getElementById("update_button"); 

    button.addEventListener("click", () => 
        updateStatus(input_id.value, input_status.value)
    );
}