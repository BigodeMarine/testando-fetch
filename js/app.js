import {Cliente, ClienteService} from './classes.js'; 
import {criarElementoCliente, validarCliente} from './utils.js';

const API_URL = "https://crudcrud.com/api/249b37232b4f4c169104f234f678df75/clientes";
const service = new ClienteService(API_URL);

const form = document.getElementById("clientForm");
const listaClientes = document.getElementById("listaClientes");
const inputUsuario = document.getElementById("usuario");
const inputEmail = document.getElementById("email");

document.addEventListener("DOMContentLoaded", carregarClientes);

form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const usuario = inputUsuario.value;
    const email = inputEmail.value;

    if(!validarCliente(usuario, email)) {
        alert("Preencha os dados corretamente.")
        return;
    }

    try {
        const novo = new Cliente(null, usuario, email);
        const clienteCriado = await service.criar(novo);
        renderizarCliente(clienteCriado);
        form.reset();
    }

    catch(erro) {
        console.error("Erro ao cadastrar cliente:", erro);
    }
});

async function carregarClientes() {
    try {
        const clientes = await service.buscarTodos();
        listaClientes.innerHTML = "";
        clientes.forEach(renderizarCliente);
    }

    catch (erro) {
        console.error("Erro ao buscar clientes:", erro);
    }
    
}

function renderizarCliente(cliente) {
    const li = criarElementoCliente(cliente, excluirCliente);
    listaClientes.appendChild(li);
}

async function excluirCliente(id, elemento) {
    try {
        await service.excluir(id);
        elemento.remove();
    }
    catch (erro) {
        console.error("Erro ao excluir cliente:", erro);
    }
}
