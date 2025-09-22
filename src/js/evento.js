import festivais from "../json/festivais.json" with { type: "json" };
import solos from "../json/solos.json" with { type: "json" };
import { montarEvento } from "./utils.js";
const searchParams = new URLSearchParams(window.location.search);

function escolherSetor(idEvento, infosSetor, eventoTipo){
    //Para passar o valor correto do ingresso pra prox pag tem que colocar no url o tipo de ingresso escolhido
    window.location = `servicosAdicionais.html?idEvento=${idEvento}&idSetor=${infosSetor.id}&tipo=${eventoTipo}&tipoIngresso${}`;
}

function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function montarTabelaPrecos(infosEvento, eventoTipo) {
    const corpoTabela = document.getElementById("corpo-tabela");

    corpoTabela.innerHTML = "";

    infosEvento.setores.forEach((setor) => {
        const linha = document.createElement('tr');
        linha.classList.add('linha-setor'); 

        const setorTd = document.createElement('td');
        setorTd.textContent = setor.nome;

        const inteiraTd = document.createElement('td');
        inteiraTd.textContent = formatarPreco(setor.inteira);

        const meiaTd = document.createElement('td');
        meiaTd.textContent = formatarPreco(setor.meia);

        linha.addEventListener('click', () => {
            escolherSetor(infosEvento.id, setor, eventoTipo);
        });
        
        linha.appendChild(setorTd);
        linha.appendChild(inteiraTd);
        linha.appendChild(meiaTd);

        corpoTabela.appendChild(linha);
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

    let descricao = document.getElementById("descricao");
    descricao.innerHTML = `${infoEvento.descricao}`; 

    montarEvento(infoEvento);
    montarTabelaPrecos(infoEvento,eventoTipo)
})();