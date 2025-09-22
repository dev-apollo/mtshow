import festivais from "../json/festivais.json" with { type: "json" };
import solos from "../json/solos.json" with { type: "json" };

const searchParams = new URLSearchParams(window.location.search);

function retornarIndex(){
    window.location = "index.html"
}

function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function montarRevisao(infosEvento, infosSetor, idServicos){
    let nomeEvento = document.getElementById("nomeRevisao")
    nomeEvento.innerHTML = `${infosEvento.nomeEvento}`

    let dataRevisao = document.getElementById("dataRevisao")
    dataRevisao.innerHTML = `<strong>Data:</strong> ${infosEvento.data}`;

    let horarioRevisao = document.getElementById("horarioRevisao")
    horarioRevisao.innerHTML = `<strong>Horário:</strong> ${infosEvento.horario}`;

    let localRevisao = document.getElementById("localRevisao")
    localRevisao.innerHTML = `<strong>Local:</strong> ${infosEvento.local}`

    let setorRevisao = document.getElementById("setorRevisao")
    setorRevisao.innerHTML = `<strong>Setor:</strong> ${infosSetor.nome} - R$ ${infosSetor.preco}`

    document.getElementById("imagemPromo").src = infosEvento.imagemPromo;

    let valorTotal = infosSetor.preco;

    let divServicos = document.getElementById("servicosRevisao")
    if(idServicos != ""){
        idServicos.forEach((id) => {
            const servico = infosSetor.servicosAdicionais.find(s => s.id == id)
            valorTotal += servico.preco;
            if(servico){
               let pServico = document.createElement("p")
               pServico.innerHTML = `${servico.nome} - R$ ${servico.preco}`
               divServicos.appendChild(pServico)
            }
        })
    }
    document.getElementById("valorFinal").textContent = formatarPreco(valorTotal);

}

(()=> {
    const searchParams = new URLSearchParams(window.location.search);
    const eventoTipo = searchParams.get("tipo");
    const idServicos = (searchParams.get("idServicos") || "").split(",");

    let infosEvento;

    if(eventoTipo === "festival"){
        infosEvento = festivais[searchParams.get("idEvento")-1];
    }else{
        infosEvento = solos[searchParams.get("idEvento")-1];
    }
    const infosSetor = infosEvento.setores[searchParams.get("idSetor")-1];
    
    montarRevisao(infosEvento, infosSetor, idServicos);

    const buttonRetornar = document.getElementById("retornar")
    buttonRetornar.addEventListener("click", () => {
        retornarIndex()
    })
})()