import eventos from "../json/eventos.json" with { type: "json" };
const searchParams = new URLSearchParams(window.location.search);

function escolherSetor(idEvento, infosSetor){
    window.location = `servicosAdicionais.html?idEvento=${idEvento}&idSetor=${infosSetor.id}`;
}

function criarArtista(infosArtista){
    let artista = document.createElement("div");

    let nomeArtista = document.createElement("p");
    nomeArtista.innerHTML = `- ${infosArtista}`;
    
    artista.appendChild(nomeArtista);

    return artista;
}

function criarSetor(idEvento, infosSetor){
    let setor = document.createElement("button");
    setor.textContent = `${infosSetor.nome}`;
    setor.addEventListener("click", () => {
        escolherSetor(idEvento, infosSetor);
    })


    return setor;
}

function montarEvento(infosEvento){
    document.title = `MTShow - ${infosEvento.nomeEvento}`;

    let imagemPromo = document.getElementById("imagemPromo");
    imagemPromo.src = infosEvento.imagemPromo;

    let nomeEvento = document.getElementById("nomeEvento");
    nomeEvento.innerHTML = `${infosEvento.nomeEvento}`;

    let dataHora = document.getElementById("data-horario");
    dataHora.innerHTML = `${infosEvento.data} - ${infosEvento.horario}`;

    let local = document.getElementById("local");
    local.innerHTML = `${infosEvento.local}`;

    let descricao = document.getElementById("descricao");
    descricao.innerHTML = `${infosEvento.descricao}`;    

    let divArtistas = document.getElementById("artistas");
    infosEvento.atracoes.map((infosArtista) => {
        let artista = criarArtista(infosArtista);
        divArtistas.appendChild(artista);
    })

    let divSetores = document.getElementById("setores");
    infosEvento.setores.map((infosSetor) => {
        let setor = criarSetor(infosEvento.id, infosSetor);
        divSetores.appendChild(setor);
    })
}

(() => {
    const infosEvento = eventos[searchParams.get("id")-1];
    montarEvento(infosEvento);
})();