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
    input_status.type = "text"; 

    let update_button = document.createElement("button");
    update_button.id = "update_button";
    update_button.textContent = "Actualizar";
    update_button.type = "button";

    document.body.appendChild(title);
    document.body.appendChild(input_id);
    document.body.appendChild(input_status);
    document.body.appendChild(update_button);

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
        alert("Estado del incidente actualizado!");
    })
    .catch(error => {
        console.error("Error al actualizar estado", error);
        alert("Error al actualizar estado");
    });
}

function main (){

    createElements();
    addStyle();

    let input_id = document.getElementById("input_id");
    let input_status = document.getElementById("input_status");
    let button = document.getElementById("update_button"); 

    button.addEventListener("click", () => {
        let id = input_id.value.trim();
        let status = input_status.value.trim();

        if (!id || !status) {
            alert("Por favor complete todos los campos.");
            return;
        }
        updateStatus(id, status);
        input_id.value = "";
        input_status.value = "";
    });
}

main();