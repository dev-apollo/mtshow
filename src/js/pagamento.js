import eventos from "../json/eventos.json" with { type: "json" };
const searchParams = new URLSearchParams(window.location.search);

function confirmarPagamento(infosEvento, infosSetor, idServicos){
    const idServicosStr = idServicos.join(",")
    window.location = `revisao.html?idEvento=${infosEvento.id}&idSetor=${infosSetor.id}&idServicos=${idServicosStr}`;
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
    const infosEvento = eventos[searchParams.get("idEvento")-1];
    const infosSetor = infosEvento.setores[searchParams.get("idSetor")-1];
    const idServicos = (searchParams.get("idServicos") || "").split(",");
    definirValor(infosSetor, idServicos);
    const buttonConfirmarPagamento = document.getElementById("confirmarPagamento");
    buttonConfirmarPagamento.addEventListener("click", () => {
        confirmarPagamento(infosEvento, infosSetor, idServicos);
    })
})()