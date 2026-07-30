console.log("crud.js carregou");

let chamados = buscarChamados();

function criarChamado(chamado) {
    chamados.push(chamado);
    salvarChamados(chamados);
}

function listarChamados() {
    return chamados;
}

function excluirChamado(id) {
    chamados = chamados.filter(
        chamado => chamado.id !== id
    );
    salvarChamados(chamados);
}

function atualizarChamado(id, dadosAtualizados) {
    chamados = chamados.map(chamado =>
        chamado.id === id
            ? { ...chamado, ...dadosAtualizados }
            : chamado
    );
    salvarChamados(chamados);
}