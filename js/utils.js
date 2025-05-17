export function criarElementoCliente(cliente, onDelete) {
    const li = document.createElement("li");
    li.textContent = `${cliente.usuario} - ${cliente.email}`;

    const btn = document.createElement("button");
    btn.textContent = "Excluir";
    btn.addEventListener("click", () => onDelete(cliente.id, li));

    li.appendChild(btn);
    return li;
}

export function validarCliente(usuario, email) {
    return usuario.trim() !== "" && email.trim() !== "" && email.includes("@");
}