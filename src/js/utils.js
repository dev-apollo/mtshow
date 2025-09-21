export function montarEvento(infosEvento){
    document.title = `MTShow - ${infosEvento.nomeEvento}`;

    let imagemPromo = document.getElementById("imagemPromo");
    imagemPromo.src = infosEvento.imagemPromo;

    let nomeEvento = document.getElementById("nomeEvento");
    nomeEvento.innerHTML = `${infosEvento.nomeEvento}`;

    let dataHora = document.getElementById("data-horario");
    dataHora.innerHTML = `${infosEvento.data} - ${infosEvento.horario}`;

    let local = document.getElementById("local");
    local.innerHTML = `${infosEvento.local}`;
}
