
function createElements(){

    let title = document.createElement("h1");
    title.id = "title";
    title.textContent = "Eliminar incidente";
    
    let input_id = document.createElement("input");
    input_id.id = "input_id";
    input_id.placeholder = "Ingrese el ID del incidente:";
    input_id.type = "text"; //cambiar esto a number

    let delete_button = document.createElement("button");
    delete_button.id = "delete_button";
    delete_button.textContent = "Eliminar";

            
}

function addStyle(){

}

function deleteIncident(id){
    fetch(`http://localhost:3000/incidents/:${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    
    .then(response => response.json())
    .then(data => {
        console.log("Incidente eliminado", data);
    })
    .catch(error => {
        console.error("Error al eliminar incidente", error);
    });
}

function main (){

    createElements();
    addStyle();
    
    let input_id = document.getElementById("input_id");
    let button = document.getElementById("delete_button"); 

    button.addEventListener("click", () => 
        deleteIncident(input_id.textContent)
    );
}