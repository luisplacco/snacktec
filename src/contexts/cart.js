import { createContext, useEffect, useState } from "react";

const CartContext = createContext({});



function CartProvider(props){

const [itens, setItens] = useState([]);
const [vl_total, setVl_total] = useState(0);
const [desconto, setDesconto] = useState(2);
const [subtotal, setSubtotal] = useState(0);
const [total, setTotal] = useState(0);

function AddItem(item){
    const novoItens = [...itens, item];
    setItens(novoItens);
    CalculaValores();
}

function CalculaValores(){
    const subtotalTemp = itens.reduce((prev, atual) => {
        return prev + atual.vl_total;
    }, 0);
    
    setSubtotal(subtotalTemp);
    setTotal(subtotalTemp - desconto);
}

useEffect(() => {
    CalculaValores();
},[itens]);


return <CartContext.Provider value={ { itens, setItens, vl_total, setVl_total,
                                     desconto, setDesconto, subtotal, setSubtotal, total, setTotal, AddItem, CalculaValores } }>
    {props.children}
</CartContext.Provider>

}

export { CartContext, CartProvider };