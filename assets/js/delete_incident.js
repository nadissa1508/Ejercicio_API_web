
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

function addStyle(){

}

function deleteIncident(id){
    if (!confirm(`¿Estás seguro de que querés eliminar el incidente con ID ${id}?`)) return;

    fetch(`http://localhost:3000/incidents/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    
    .then(response => response.json())
    .then(data => {
        console.log("Incidente eliminado", data);
        alert("Incidente eliminado");
    })
    .catch(error => {
        console.error("Error al eliminar incidente", error);
        alert("Error al eliminar incidente");
    });
}

function main (){

    createElements();
    addStyle();
    
    let input_id = document.getElementById("input_id");
    let button = document.getElementById("delete_button"); 


    button.addEventListener("click", () => {
        const id = input_id.value.trim();

        if (!id) {
            alert("Por favor ingrese un ID válido.");
            return;
        }
        deleteIncident(id);
        input_id = "";
    });
}

main();