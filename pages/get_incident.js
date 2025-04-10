function createElements(){

    let title = document.createElement("h1");
    title.id = "title";
    title.textContent = "Incidentes reportados";

    let search_bar = document.createElement("input");
    search_bar.id = "search_bar";
    search_bar.placeholder = "Ingrese el ID del incidente:";
    search_bar.type = "text"; //cambiar esto a number

    let table = document.createElement("table");
    table.id = "table";
    //esto fijo no es asi
    table.thead.tr.th = "ID incidente";
    table.thead.tr.th = "Empleado";
    table.thead.tr.th = "Equipo";
    table.thead.tr.th = "descripción";
    table.thead.tr.th = "Estado";
    table.thead.tr.th = "Reportado en";
}

function addStyle(){

}

function getIncidents(id){
    let url = "";

    if (id === undefined){
        url = `http://localhost:3000/incidents`;
    }else{
        url = `http://localhost:3000/incidents/:${id}`;            
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('table');
            postContainer.innerHTML = '';

            // filtrar segun  la barra de busqueda
            let filtIncidents;

            if(id){
                filtIncidents = data.incidents.filter(inc => inc.id.includes(id));
            }else{
                filtIncidents = data.incidents;
            }
        
            filtIncidents.forEach(incident => {
                //agregar elementos a la tabla
            });
    })
    .catch(error => console.error('Error fetching incidents:', error));
}

function main (){

    createElements();
    addStyle();

    let search_bar = document.getElementById("search_bar");

    search_bar.addEventListener("input", () => 
        getIncidents(search_bar.textContent)
    );
}
