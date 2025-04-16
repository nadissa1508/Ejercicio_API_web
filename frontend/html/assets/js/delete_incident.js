
function createElements(){

    let title = document.createElement("h1");
    title.id = "title";
    title.textContent = "Eliminar incidente";
    
    let input_id = document.createElement("input");
    input_id.id = "input_id";
    input_id.placeholder = "Ingrese el ID del incidente:";
    input_id.type = "number"; 

    let delete_button = document.createElement("button");
    delete_button.id = "delete_button";
    delete_button.textContent = "Eliminar";
    delete_button.type = "button";

    document.body.appendChild(title);
    document.body.appendChild(input_id);
    document.body.appendChild(delete_button); 
}

async function deleteIncident(id){
    if (!confirm(`¿Estás seguro de que querés eliminar el incidente con ID ${id}?`)) return;

    try {
        const response = await fetch(`http://localhost:3001/incidents/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al eliminar incidente");
        }

        console.log("Incidente eliminado:", data);
        alert(`Incidente eliminado correctamente`);
        return true;
    } catch (error) {
        console.error("Error al eliminar incidente:", error);
        alert(`Error al eliminar incidente`);
        return false;
    }
}

function main (){

    createElements();
    
    let input_id = document.getElementById("input_id");
    let button = document.getElementById("delete_button"); 


    button.addEventListener("click", async () => {
        const id = input_id.value.trim();

        if (!id) {
            alert("Por favor ingrese un ID válido.");
            return;
        }
        const success = await deleteIncident(id);
        
        if (success) {
            input_id.value = ""; 
        }
    });
}

main();