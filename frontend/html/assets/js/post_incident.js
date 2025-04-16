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
    input_id_equipment.placeholder = "Ingrese ID del equipo:";
    input_id_equipment.type = "number"; 

    let label3 = document.createElement("label");
    label3.textContent = "Descripción:";

    let textarea_description = document.createElement("textarea");
    textarea_description.id = "description";
    textarea_description.placeholder = "Ingrese la descripción del incidente:";
    textarea_description.rows = 4; 
    textarea_description.cols = 50;  


    let submit_button = document.createElement("button");
    submit_button.id = "submit_button";
    submit_button.textContent = "Enviar";
    submit_button.type = "button";

    form.appendChild(label1);
    form.appendChild(input_id_employee);

    form.appendChild(label2);
    form.appendChild(input_id_equipment);

    form.appendChild(label3);
    form.appendChild(textarea_description);

    form.appendChild(submit_button);

    document.body.appendChild(title);
    document.body.appendChild(form);
  
}

async function postIncident(employee_id, equipment_id, description){

    if (!employee_id || !equipment_id || !description || description.length < 10) {
        alert("Por favor complete todos los campos correctamente (descripción mínimo 10 caracteres)");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/incidents`, {
            method: "POST",
            body: JSON.stringify({
                employee_id: parseInt(employee_id),
                equipment_id: parseInt(equipment_id),
                description: description
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al crear incidente");
        }

        console.log("Incidente creado:", data);
        alert(`Incidente creado exitosamente!`);
        return true;
    } catch (error) {
        console.error("Error al crear incidente:", error);
        alert(`Error al crear incidente`);
        return false;
    }

}

function main (){

    createElements();

    let input_id_employee = document.getElementById("id_employee");
    let input_id_equipment = document.getElementById("id_equipment");
    let textarea_description = document.getElementById("description");
    let button = document.getElementById("submit_button"); 

    button.addEventListener("click", async () => {
        const flag = await postIncident(
            input_id_employee.value, 
            input_id_equipment.value, 
            textarea_description.value
        );
        if(flag){
            input_id_employee.value = "";
            input_id_equipment.value = "";
            textarea_description.value = "";
        }     
    });
}

main();