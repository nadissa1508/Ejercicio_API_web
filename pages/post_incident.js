function createElements(){

    let title = document.createElement("h1");
    title.id = "title";
    title.textContent = "Crear incidente";

    let form = document.createElement("form");
    form.id = "form";
    form.method = "POST"; 

    let label1 = document.createElement("label");
    label1.textContent = "ID del empleado:";

    let input_id_employee = document.createElement("input");
    input_id_employee.id = "id_employee";
    input_id_employee.type = "number"; 

    let label2 = document.createElement("label");
    label2.textContent = "ID del equipo:";

    let input_id_equipment = document.createElement("input");
    input_id_equipment.id = "id_equipment";
    input_id_equipment.placeholder = "Ingrese el estado del incidente:";
    input_id_equipment.type = "number"; 

    let label3 = document.createElement("label");
    label3.textContent = "Descripción:";

    let input_description = document.createElement("input");
    input_description.id = "description";
    input_description.placeholder = "Ingrese el estado del incidente:";
    input_description.type = "text"; 


    let submit_button = document.createElement("button");
    submit_button.id = "submit_button";
    submit_button.textContent = "Enviar";

    form.appendChild(label1);
    form.appendChild(input_id_employee);

    form.appendChild(label2);
    form.appendChild(input_id_equipment);

    form.appendChild(label3);
    form.appendChild(input_description);

    form.appendChild(submit_button);

    document.body.appendChild(title);
    document.body.appendChild(form);
  
}

function addStyle(){

}

function postIncident(employee_id, equipment_id, description){
    fetch(`http://localhost:3000/incidents`, {
        method: "POST",

        body: JSON.stringify({
            employee_id: employee_id,
            equipment_id: equipment_id,
            description: description
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    .then(response => response.json())
    .then(data => {
        console.log(`Incidente creado!`, data);
        alert("Incidente creado!");
    })
    .catch(error => {
        console.error("Error al crear incidente", error);
    });
}

function main (){

    createElements();
    addStyle();

    let input_id_employee = document.getElementById("id_employee");
    let input_id_equipment = document.getElementById("id_equipment");
    let input_description = document.getElementById("description");
    let button = document.getElementById("submit_button"); 

    button.addEventListener("click", () => 
        postIncident(input_id_employee.value , input_id_equipment.value, input_description.value)
    );
}

