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

async function updateStatus(id, incident_status){
    try {
        const response = await fetch(`http://localhost:3001/incidents/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                status: incident_status
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al actualizar estado");
        }

        console.log(`Estado del incidente actualizado:`, data);
        alert(`¡Estado actualizado correctamente a ${incident_status}!`);
        return true;
    } catch (error) {
        console.error("Error al actualizar estado:", error);
        alert(`Error al actualizar el estado`);
        return false;
    }
}

function main (){

    createElements();

    let input_id = document.getElementById("input_id");
    let input_status = document.getElementById("input_status");
    let button = document.getElementById("update_button"); 

    button.addEventListener("click", async () => {
        let id = input_id.value.trim();
        let status = input_status.value.trim();

        if (!id || !status) {
            alert("Por favor complete todos los campos.");
            return;
        }
        const flag = await updateStatus(id, status);
        
        if (flag) {
            input_id.value = "";
            input_status.value = "";
        }
    });
}

main();