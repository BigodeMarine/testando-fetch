export class Cliente {
    constructor(id, usuario, email) {
        this.id = id;
        this.usuario = usuario;
        this.email = email;
    }

    static fromJson(obj) {
        return new Cliente(obj._id, obj.usuario, obj.email);
    }
}

export class ClienteService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async buscarTodos() {
        const res = await fetch(this.apiUrl);
        const dados = await res.json();
        
        return dados.map(Cliente.fromJson);
    }

    async criar(cliente) {
        const res = await fetch(this.apiUrl, {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                usuario: cliente.usuario,
                email: cliente.email,
            })
        });

        const data = await res.json();
        return Cliente.fromJson(data);
    }

    async excluir(id) {
        await fetch(`${this.apiUrl}/${id}`, {
            method: "DELETE"
        });
    }
}