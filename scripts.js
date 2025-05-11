const API_BASE_URL = "https://crudcrud.com/api/a6e5327df9b9484ca687743ab1ae15b3/clientes";
const form = document.getElementById("clientForm");
const listaClientes = document.getElementById("listaClientes");

window.addEventListener("DOMContentLoaded", buscarClientes);

function buscarClientes() {
    fetch(API_BASE_URL)
    .then(resposta => resposta.json())
    .then(dados => {
        listaClientes.innerHTML = '';
        dados.forEach(cliente => adicionarCliente(cliente));
    })
    .catch(error => console.log("Erro ao buscar cliente", error));
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;

    const novoCliente = {usuario, email};

    fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(novoCliente),
    })
    .then(resposta => resposta.json())
    .then(cliente => {
        adicionarCliente(cliente);
        form.reset();
    })
    .catch(error => console.log("Erro ao cadastrar cliente", error));   
    });

    function adicionarCliente(cliente) {
        const li = document.createElement("li");
        li.innerHTML = `${cliente.usuario} - ${cliente.email}
        <button onclick="excluirCliente('${cliente._id}', this)">Excluir</button>`;
        listaClientes.appendChild(li);
    }

    function excluirCliente(id, botao) {
        fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            const li = botao.parentElement;
            li.remove();
        })
        .catch(error => console.log("Erro ao excluir cliente", error))
    }