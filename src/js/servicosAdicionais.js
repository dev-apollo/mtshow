import eventos from "../json/eventos.json" with { type: "json" };
const searchParams = new URLSearchParams(window.location.search);

function confirmarServicos(infosEvento, infosSetor){
    const servicos = document.querySelectorAll("input[type='checkbox']")
    const idServicos = [] 
    servicos.forEach(checkbox => {
        if(checkbox.checked) idServicos.push(checkbox.value)
    })
    const idServicosStr = idServicos.join(",")
    window.location = `pagamento.html?idEvento=${infosEvento.id}&idSetor=${infosSetor.id}&idServicos=${idServicosStr}`;
}

function criarServicoAdicional(infosServicos){
    let divServico = document.createElement("div");

    let inputServico = document.createElement("input");
    inputServico.type = "checkbox";
    inputServico.value = infosServicos.id
    inputServico.id = `servico${infosServicos.id}`

    let labelServico = document.createElement("label")
    labelServico.innerHTML = `${infosServicos.nome} - R$ ${infosServicos.preco}`;
    labelServico.htmlFor = inputServico.id;

    divServico.appendChild(inputServico)
    divServico.appendChild(labelServico)

    return divServico
}

function montarServicosAdicionais(infosSetor, infosEvento){
    let setor = document.getElementById("setor");
    setor.innerHTML = `${infosSetor.nome} - ${infosEvento.nomeEvento}`

    let preco = document.getElementById("preco");
    preco.innerHTML = `Valor: R$ ${infosSetor.preco}`

    let formServicosAdicionais = document.getElementById("servicos");
    infosSetor.servicosAdicionais.map((infosServicoAdicional) => {
        let servicoAdicional = criarServicoAdicional(infosServicoAdicional);
        formServicosAdicionais.appendChild(servicoAdicional)
    })

    let buttonConfirmarServicos = document.createElement("button");
    buttonConfirmarServicos.textContent = "Confirmar serviços";
    buttonConfirmarServicos.addEventListener("click", (e) => {
        e.preventDefault()
        confirmarServicos(infosEvento, infosSetor)
    })

    formServicosAdicionais.appendChild(buttonConfirmarServicos)
}

(() => {
    const infosEvento = eventos[searchParams.get("idEvento")-1];
    const infosSetor = infosEvento.setores[searchParams.get("idSetor")-1];
    montarServicosAdicionais(infosSetor, infosEvento);
})();