import { createContext, useState } from "react";

const CartContext = createContext({});

const pedidos = 
    {   
        "VL_TOTAL": 42,
        "DESCONTO": 1,
        "SUBTOTAL": 41,
        "ITENS": [
            {
                "ID_PEDIDO": 1,
                "ID_PRODUTO": 2,
                "QTD": 1,
                "VL_UNITARIO": 4,
                "VL_TOTAL": 4,
                "PRECO": 4,
                "ICONE": "https://luisfelipe.free.nf/images/coca.png",
                "NOME": "Coca-cola",
                "DESCRICAO": "Coca-cola normal",
                "FAVORITO": "N",
                "ESTOQUE": 30,
                "ATIVO": 1,
            },
            {
                "ID_PEDIDO": 1,
                "ID_PRODUTO": 5,
                "QTD": 1,
                "VL_UNITARIO": 6,
                "VL_TOTAL": 6,
                "PRECO": 6,
                "ICONE": "https://luisfelipe.free.nf/images/brownie-removebg-preview.png",
                "NOME": "Brownie",
                "DESCRICAO": "Brownie de chocolate artesanal",
                "FAVORITO": "N",
                "ESTOQUE": 30,
                "ATIVO": 1,
            }
        ]
    };



function CartProvider(props){

const [cart, setCart] = useState(pedidos);
return <CartContext.Provider value={ { cart, setCart } }>
    {props.children}
</CartContext.Provider>

}


export { CartContext, CartProvider };