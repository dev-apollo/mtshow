import festivais from "../json/festivais.json" with { type: "json" };
import solos from "../json/solos.json" with { type: "json" };

function verDetalhes(infosEvento, tipo){
    window.location =`evento.html?tipo=${tipo}&id=${infosEvento.id}`;
}

function criarEvento(infosEvento, tipo){
    let evento = document.createElement("div");
    evento.classList.add("card")

    let imagemPromo = document.createElement("img");
    imagemPromo.src = infosEvento.imagemPromo;
    
    let local = document.createElement("p");
   
    local.innerHTML = `${infosEvento.local}`;

    let nomeEvento = document.createElement("p");
    nomeEvento.innerHTML = `${infosEvento.nomeEvento}`;
    nomeEvento.classList.add("card-descricao")
    
    let botaoDetalhes = document.createElement("button");
    botaoDetalhes.textContent = "Ver detalhes";
    botaoDetalhes.addEventListener("click", () => {
        verDetalhes(infosEvento,tipo)
    })
    

    evento.appendChild(imagemPromo)
    evento.appendChild(nomeEvento)
    evento.appendChild(botaoDetalhes);
    
    
    return evento;
}

(() => {
    let divFestivais = document.getElementById("festivais");
    festivais.map((infosEvento) => {
        let evento = criarEvento(infosEvento, "festival");
        divFestivais.appendChild(evento);
    });

    let divSolos = document.getElementById("solos");
    solos.map((infosEvento) => {
        let evento = criarEvento(infosEvento, "solo");
        divSolos.appendChild(evento);
    });

})();