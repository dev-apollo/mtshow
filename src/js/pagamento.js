import festivais from "../json/festivais.json" with { type: "json" };
import solos from "../json/solos.json" with { type: "json" };
import { montarEvento } from './utils.js'

const searchParams = new URLSearchParams(window.location.search);

function confirmarPagamento(infosEvento, infosSetor, idServicos, tipoEvento){
    const idServicosStr = idServicos.join(",")
    //Para passar o valor correto do ingresso pra prox pag tem que colocar no url o tipo de ingresso escolhido
    window.location = `revisao.html?idEvento=${infosEvento.id}&idSetor=${infosSetor.id}&idServicos=${idServicosStr}&tipo=${tipoEvento}&tipoIngresso${}`;
}

function definirValor(infosSetor, idServicos){
    let valorFinal = Number(infosSetor.preco);
    idServicos.forEach((id) => {
        const servico = infosSetor.servicosAdicionais.find(s => s.id == id)
        if(servico) valorFinal += Number(servico.preco);
    })

    let pValor = document.getElementById("valor")
    pValor.innerHTML = `R$ ${valorFinal.toFixed(2)}`
}

(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const eventoTipo = searchParams.get("tipo");
    //Pra ler o tipo do ingresso
    //const tipoIngresso = searchParams("tipoIngresso")
    let idServicos = (searchParams.get("idServicos") || "").split(",");
    let infosEvento;
    
    if(eventoTipo === "festival"){
        infosEvento = festivais[searchParams.get("idEvento")-1];
    }else{
        infosEvento = solos[searchParams.get("idEvento")-1];
    }
    const infosSetor = infosEvento.setores[searchParams.get("idSetor")-1]; 
    montarEvento(infosEvento)
    definirValor(infosSetor, idServicos);
    const buttonConfirmarPagamento = document.getElementById("confirmarPagamento");
    buttonConfirmarPagamento.addEventListener("submit", () => {
        confirmarPagamento(infosEvento, infosSetor, idServicos, eventoTipo);
    })
})()