console.log("app.js carregou");

const formulario = document.getElementById("formChamado");
const lista = document.getElementById("listaChamados");
const botaoSubmit = formulario.querySelector('button[type="submit"]');

const btnAnterior = document.getElementById("btnAnterior");
const btnProximo = document.getElementById("btnProximo");
const paginaAtualTexto = document.getElementById("paginaAtual");

let paginaAtual = 1;

const itensPorPagina = 4;

let idEmEdicao = null;

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prioridade = document.getElementById("prioridade").value;

    if (!titulo || !descricao) {
        alert("Preencha título e descrição.");
        return;
    }

    if (idEmEdicao) {
        atualizarChamado(idEmEdicao, { titulo, descricao, prioridade });
        idEmEdicao = null;
        botaoSubmit.textContent = "Criar chamado";
    } else {
        const chamado = {
            id: Date.now(),
            titulo: titulo,
            descricao: descricao,
            prioridade: prioridade,
            status: "Aberto"
        };
        criarChamado(chamado);
    }

    formulario.reset();
    mostrarChamados();
});

function mostrarChamados() {
    lista.innerHTML = "";

    const chamados = listarChamados();

    const totalPaginas = Math.ceil(chamados.length / itensPorPagina);

    const inicio = (paginaAtual - 1) * itensPorPagina;

    const fim = inicio + itensPorPagina;

    const chamadosPagina = chamados.slice(inicio, fim);

    if (chamados.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhum chamado cadastrado.</p>';
        return;
    }

    chamadosPagina.forEach(function(chamado) {

        const card = document.createElement("div");
        card.className = `chamado prioridade-${chamado.prioridade.toLowerCase()}`;

        card.innerHTML = `
            <div class="chamado-cabecalho">
                <h3>${escapeHTML(chamado.titulo)}</h3>
                <span class="badge">${chamado.prioridade}</span>
            </div>
            <p>${escapeHTML(chamado.descricao)}</p>
            <small>Status: ${chamado.status}</small>
            <div class="acoes">
                <button class="btn-editar" data-id="${chamado.id}">Editar</button>
                <button class="btn-excluir" data-id="${chamado.id}">Excluir</button>
            </div>
        `;

        lista.appendChild(card);
    });

    lista.querySelectorAll(".btn-editar").forEach(function(botao) {
        botao.addEventListener("click", function() {
            iniciarEdicao(Number(botao.dataset.id));
        });
    });

    lista.querySelectorAll(".btn-excluir").forEach(function(botao) {
        botao.addEventListener("click", function() {
            removerChamado(Number(botao.dataset.id));
        });
    });

    paginaAtualTexto.textContent = `Página ${paginaAtual} de ${totalPaginas}`;

    btnAnterior.disabled = paginaAtual === 1;
    btnProximo.disabled = paginaAtual === totalPaginas || totalPaginas === 0;
    
}

btnAnterior.addEventListener("click", function() {

    if (paginaAtual > 1) {
        paginaAtual--;
        mostrarChamados();
    }

});

btnProximo.addEventListener("click", function() {

    const totalPaginas = Math.ceil(listarChamados().length / itensPorPagina);

    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        mostrarChamados();
    }

});

function iniciarEdicao(id) {
    const chamado = listarChamados().find(c => c.id === id);
    if (!chamado) return;

    document.getElementById("titulo").value = chamado.titulo;
    document.getElementById("descricao").value = chamado.descricao;
    document.getElementById("prioridade").value = chamado.prioridade;

    idEmEdicao = id;
    botaoSubmit.textContent = "Salvar alterações";
}

const modalOverlay = document.getElementById("modalOverlay");
const modalConfirmar = document.getElementById("modalConfirmar");
const modalCancelar = document.getElementById("modalCancelar");

let idParaExcluir = null;

function removerChamado(id) {
    idParaExcluir = id;
    modalOverlay.classList.add("ativo");
}

modalConfirmar.addEventListener("click", function() {
    excluirChamado(idParaExcluir);
    modalOverlay.classList.remove("ativo");
    idParaExcluir = null;
    mostrarChamados();
});

modalCancelar.addEventListener("click", function() {
    modalOverlay.classList.remove("ativo");
    idParaExcluir = null;
});

function escapeHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

mostrarChamados();