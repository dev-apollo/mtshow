import festivais from "../json/festivais.json" with { type: "json" };
import solos from "../json/solos.json" with { type: "json" };
import { montarEvento } from './utils.js'

const searchParams = new URLSearchParams(window.location.search);

function confirmarPagamento(infosEvento, infosSetor, idServicos, tipoEvento){
    const idServicosStr = idServicos.join(",")
    window.location = `revisao.html?idEvento=${infosEvento.id}&idSetor=${infosSetor.id}&idServicos=${idServicosStr}&tipo=${tipoEvento}`;
}

function definirValor(infosSetor, idServicos){
    let valorFinal = Number(infosSetor.preco);
    idServicos.forEach((id) => {
        const servico = infosSetor.servicosAdicionais.find(s => s.id == id)
        if(servico) valorFinal += Number(servico.preco);
    })

    let pValor = document.getElementById("valor")
    pValor.innerHTML = `Valor final: R$ ${valorFinal.toFixed(2)}`
}

(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const eventoTipo = searchParams.get("tipo");
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
    buttonConfirmarPagamento.addEventListener("click", () => {
        confirmarPagamento(infosEvento, infosSetor, idServicos, eventoTipo);
    })
})()