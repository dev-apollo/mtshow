import festivais from "../json/festivais.json" with { type: "json" };
import solos from "../json/solos.json" with { type: "json" };
import { montarEvento } from "./utils.js";
const searchParams = new URLSearchParams(window.location.search);

function escolherSetor(idEvento, infosSetor, eventoTipo){
    window.location = `servicosAdicionais.html?idEvento=${idEvento}&idSetor=${infosSetor.id}&tipo=${eventoTipo}`;
}

function criarSetor(idEvento, infosSetor, eventoTipo){
    let setorLinha = document.createElement("tr");
    setorLinha.classList.add("linha-setor"); 

    let nomeTd = document.createElement("td");
    nomeTd.textContent = infosSetor.nome;

    let precoTd = document.createElement("td");
    precoTd.textContent = infosSetor.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setorLinha.addEventListener("click", () => {
        escolherSetor(idEvento, infosSetor, eventoTipo);
    })

    setorLinha.appendChild(nomeTd);
    setorLinha.appendChild(precoTd);
    
    return setorLinha;
}

function montarTabelaSetores(infosEvento, eventoTipo) {
    let descricao = document.getElementById("descricao");
    descricao.innerHTML = `${infosEvento.descricao}`; 
    
    const corpoTabela = document.getElementById("corpo-tabela");
    corpoTabela.innerHTML = "";
    infosEvento.setores.forEach((infosSetor) => {
        const setorLinha = criarSetor(infosEvento.id, infosSetor, eventoTipo);
        corpoTabela.appendChild(setorLinha);
    });
}
(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const eventoTipo = searchParams.get("tipo");
    let infoEvento;
    if(eventoTipo === 'festival'){
        infoEvento = festivais[searchParams.get("id")-1];
    }else{
        infoEvento = solos[searchParams.get("id")-1]
    }
    montarEvento(infoEvento);
    montarTabelaSetores(infoEvento,eventoTipo)
})();