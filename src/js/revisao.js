import eventos from "../json/eventos.json" with { type: "json" };
const searchParams = new URLSearchParams(window.location.search);

function retornarIndex(){
    window.location = "index.html"
}

function montarRevisao(infosEvento, infosSetor, idServicos){
    let nomeEvento = document.getElementById("nomeRevisao")
    nomeEvento.innerHTML = `${infosEvento.nomeEvento}`

    let dataHorario = document.getElementById("data-horarioRevisao")
    dataHorario.innerHTML = `${infosEvento.data} - ${infosEvento.horario}`

    let localRevisao = document.getElementById("localRevisao")
    localRevisao.innerHTML = `${infosEvento.local}`

    let setorRevisao = document.getElementById("setorRevisao")
    setorRevisao.innerHTML = `${infosSetor.nome} - R$ ${infosSetor.preco}`

    let divServicos = document.getElementById("servicosRevisao")
    if(idServicos != ""){
        idServicos.forEach((id) => {
            const servico = infosSetor.servicosAdicionais.find(s => s.id == id)
            if(servico){
               let pServico = document.createElement("p")
               pServico.innerHTML = `${servico.nome} - R$ ${servico.preco}`
               divServicos.appendChild(pServico)
            }
        })
    }
}

(()=> {
    const infosEvento = eventos[searchParams.get("idEvento")-1];
    const infosSetor = infosEvento.setores[searchParams.get("idSetor")-1];
    const idServicos = (searchParams.get("idServicos") || "").split(",");

    montarRevisao(infosEvento, infosSetor, idServicos)

    const buttonRetornar = document.getElementById("retornar")
    buttonRetornar.addEventListener("click", () => {
        retornarIndex()
    })
})()