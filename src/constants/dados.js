export const categorias = [
    {
        id: 1,
        descricao: "Lanches",
        icone: require("../assets/cat-burguer.png")
    },
    {
        id: 2,
        descricao: "Salgados",
        icone: require("../assets/cat-pizza.png")
    },
    {
        id: 3,
        descricao: "Combos",
        icone: require("../assets/cat-fritas.png")
    },
    {
        id: 4,
        descricao: "Doces",
        icone: require("../assets/cat-sobremesa.png")
    }, 
    {
        id: 5,
        descricao: "Snacks",
        icone: require("../assets/cat-churrasco.png")
    },
    {
        id: 6,
        descricao: "Sucos Naturais",
        icone: require("../assets/cat-suco.png")
    },
    
];

export const banners = [
    {
        id: 1,
        descricao: "Combo1",
        icone: require("../assets/combo1.png")
    },
    {
        id: 2,
        descricao: "Combo2",
        icone: require("../assets/combo2.png")
    }
];



export const restaurantes = [
    {
        id: 1,
        nome: "Coca-Cola Lata",
        endereco: "R$ 5,00",
        logotipo: require("../assets/coca-destaque.png")
    },
    {
        id: 2,
        nome: "Sanduíche",
        endereco: "R$ 15,00",
        logotipo: require("../assets/sanduiche-destaque.png")
    },
    {
        id: 3,
        nome: "Ouro Branco",
        endereco: "R$ 8,00",
        logotipo: require("../assets/outrobranco.png")
    },
    {
        id: 4,
        nome: "Brownie",
        endereco: "R$ 30,00",
        logotipo: require("../assets/brownie-removebg-preview.png")
    },
    {
        id: 5,
        nome: "Quibe",
        endereco: "R$ 10,00",
        logotipo: require("../assets/quibe.png")
    },
    {
        id: 6,
        nome: "Coxinha",
        endereco: "R$ 6,00",
        logotipo: require("../assets/coxinha.png")
    }
];

    


export const pedidos = [
    {
        id: 1,
        nome: "Cantina Escolar",
        endereco: "Cantina do Colégio",
        status: "Entregue",
        dt_pedido: "07/09/2025",
        vl_total: 13.00,
    },
    {
        id: 2,
        nome: "Cantina Escolar",
        endereco: "Cantina do Colégio",
        status: "Entregue",
        dt_pedido: "07/09/2025",
        vl_total: 12.00,
    },
    {
        id: 3,
        nome: "Cantina Escolar",
        endereco: "Cantina do Colégio",
        status: "Entregue",
        dt_pedido: "07/09/2025",
        vl_total: 8.50,
    },
    {
        id: 4,
        nome: "Cantina Escolar",
        endereco: "Cantina do Colégio",
        status: "Entregue",
        dt_pedido: "07/09/2025",
        vl_total: 5.00,
    }
];


export const restaurante = {
    id: 1,
    nome: "The Keba’s Bar",
    endereco: "Rua Rui Barbosa, 512 - Paraiso - São Paulo - SP",
    logotipo: require("../assets/restaurante2.png"),
    foto: require("../assets/foto-restaurante.png"),
    vlEntrega: 5.00,
    isFavorito: true,
    cardapio: [
        {
            idCategoria: 1,
            categoria: "Ofertas",
            itens: [
                {
                    idProduto: 1,
                    nome: "Pizza Calabresa",
                    descricao: "Massa artesanal, mussarela e calabresa",
                    valor: 30.00,
                    foto: require("../assets/produto-pizza.png")
                },
                {
                    idProduto: 2,
                    nome: "Coca-Cola Lata",
                    descricao: "Coca-Cola lata de 300ml trincando de gelada",
                    valor: 5.00,
                    foto: require("../assets/produto-coca.png")
                }
            ]
        },
        {
            idCategoria: 2,
            categoria: "Mais Pedidos",
            itens: [
                {
                    idProduto: 3,
                    nome: "Pizza Mussarela",
                    descricao: "Massa artesanal, mussarela e calabresa",
                    valor: 30.00,
                    foto: require("../assets/produto-pizza.png")
                },
                {
                    idProduto: 4,
                    nome: "Coca-Cola Litro",
                    descricao: "Coca-Cola lata de 300ml trincando de gelada",
                    valor: 5.00,
                    foto: require("../assets/produto-coca.png")
                }
            ]
        }
    ]
};

export const pedido = {
    id: 1,
    nome: "Churrascaria e Pizzaria Boizão",
    endereco: "Alameda Santos, 954",
    status: "Entregue",
    dt_pedido: "10/05/2024",
    vl_total: 66.00,
    logotipo: require("../assets/restaurante1.png"),
    itens: [
        {
            idItem: 1,
            idProduto: 1,
            nome: "Pizza Calabresa",
            descricao: "Massa artesanal, mussarela e calabresa",
            foto: require("../assets/produto-pizza.png"),
            qtd: 2,
            vlUnitario: 30.00,
            vlTotal: 60.00
        },
        {
            idItem: 2,
            idProduto: 2,
            nome: "Coca-Cola Lata",
            descricao: "Coca-Cola lata de 300ml trincando de gelada",
            foto: require("../assets/produto-coca.png"),
            qtd: 1,
            vlUnitario: 6.00,
            vlTotal: 6.00
        }
    ]
};