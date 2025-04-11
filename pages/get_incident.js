function createElements(){

    let title = document.createElement("h1");
    title.id = "title";
    title.textContent = "Incidentes reportados";

    let search_bar = document.createElement("input");
    search_bar.id = "search_bar";
    search_bar.placeholder = "Ingrese el ID del incidente:";
    search_bar.type = "number"; 

    let table = document.createElement("table");
    table.id = "table";
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    ["ID", "Empleado", "Equipo", "Descripción", "Estado", "Reportado en"].forEach(header => {
        let th = document.createElement("th");
        th.textContent = header;
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);

    document.appendChild(title);
    document.appendChild(search_bar);
    document.appendChild(table);
}

function addStyle(){

}

function getIncidents(id){
    let url = "";

    if (id === undefined){
        url = `http://localhost:3000/incidents`;
    }else{
        url = `http://localhost:3000/incidents/${id}`;            
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
                let tbody = document.createElement("tbody");

                filtIncidents.forEach(incident => {
                    let tr = document.createElement("tr");

                    ["id", "reporter", "equipment", "description", "status", "created_at"].forEach(key => {
                        let td = document.createElement("td");
                        td.textContent = incident[key];
                        tr.appendChild(td);
                    });

                    tbody.appendChild(tr);
                });

                table.appendChild(tbody);
            });
    })
    .catch(error => console.error('Error fetching incidents:', error));
}

function main (){

    createElements();
    addStyle();

    let search_bar = document.getElementById("search_bar");

    search_bar.addEventListener("input", () => 
        getIncidents(search_bar.value)
    );
}
