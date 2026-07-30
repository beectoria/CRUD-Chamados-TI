console.log("app.js carregou");

const formulario = document.getElementById("formChamado");
const lista = document.getElementById("listaChamados");
const botaoSubmit = formulario.querySelector('button[type="submit"]');

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

    if (chamados.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhum chamado cadastrado.</p>';
        return;
    }

    chamados.forEach(function(chamado) {

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

    document.querySelectorAll(".btn-editar").forEach(function(botao) {
        botao.addEventListener("click", function() {
            iniciarEdicao(Number(botao.dataset.id));
        });
    });

    document.querySelectorAll(".btn-excluir").forEach(function(botao) {
        botao.addEventListener("click", function() {
            removerChamado(Number(botao.dataset.id));
        });
    });
}

function iniciarEdicao(id) {
    const chamado = listarChamados().find(c => c.id === id);
    if (!chamado) return;

    document.getElementById("titulo").value = chamado.titulo;
    document.getElementById("descricao").value = chamado.descricao;
    document.getElementById("prioridade").value = chamado.prioridade;

    idEmEdicao = id;
    botaoSubmit.textContent = "Salvar alterações";
}

function removerChamado(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este chamado?");
    if (!confirmar) return;

    excluirChamado(id);
    mostrarChamados();
}

function escapeHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

mostrarChamados();