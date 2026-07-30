console.log("storage.js carregou");

function salvarChamados(chamados) {
    localStorage.setItem(
        "chamados",
        JSON.stringify(chamados)
    );
}

function buscarChamados() {
    const chamados = localStorage.getItem("chamados");
    if (chamados) {
        return JSON.parse(chamados);
    }
    return [];
}