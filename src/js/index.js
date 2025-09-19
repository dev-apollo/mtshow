import eventos from "../json/eventos.json" with { type: "json" };

function verDetalhes(infosEvento){
    window.location =`evento.html?id=${infosEvento.id}`;
}

function criarEvento(infosEvento){
    let evento = document.createElement("div");

    let imagemPromo = document.createElement("img");
    imagemPromo.src = infosEvento.imagemPromo;

    let nomeEvento = document.createElement("p");
    nomeEvento.innerHTML = `${infosEvento.nomeEvento}`;
    
    let dataHorario = document.createElement("p");
    dataHorario.innerHTML = `${infosEvento.data} - ${infosEvento.horario}`;

    let atracoes = document.createElement("p");
    infosEvento.atracoes.map((infosAtracoes, index) => {
        atracoes.innerHTML = `${atracoes.innerHTML}`+`${infosAtracoes}`
        if(index != infosEvento.atracoes.length-1){
            atracoes.innerHTML = `${atracoes.innerHTML}`+`, `
        }
    })

    let local = document.createElement("p");
    local.innerHTML = `${infosEvento.local}`;
    
    let botaoDetalhes = document.createElement("button");
    botaoDetalhes.textContent = "Ver detalhes";
    botaoDetalhes.addEventListener("click", () => {
        verDetalhes(infosEvento)
    })

    evento.appendChild(imagemPromo);
    evento.appendChild(nomeEvento);
    evento.appendChild(dataHorario);
    evento.appendChild(atracoes)
    evento.appendChild(local);
    evento.appendChild(botaoDetalhes);
    
    return evento;
}

(() => {
    let divEventos = document.getElementById("eventos");
    eventos.map((infosEvento) => {
        let evento = criarEvento(infosEvento);
        divEventos.appendChild(evento);
    });
})();