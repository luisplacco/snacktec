import { Image, TouchableOpacity, View, Text, FlatList, ScrollView } from "react-native";
import { styles } from "./checkout.style.js";
import icons from "../../constants/icons.js";
import { use, useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.js";
import { AuthContext } from "../../contexts/auth.js";
import Produto from "../../components/produto/produto.jsx";
import Button from "../../components/button/button.jsx";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../../constants/api.js";
import { Alert } from "react-native";

function Checkout(props) {


    const nav = useNavigation();

    const { itens, setItens, subtotal, total, desconto, CalculaValores } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    function ClickDelete(id_item) {
        const itensNovo = itens.filter((item) => {
            return item.id_item !== id_item;
        });

        setItens(itensNovo);
    }

    function ClickLimpar(){
        setItens([]);
        props.navigation.goBack();
    }
    
    async function ClickFinalizar(){
        
        try {
            const ped = {
            id_usuario: user.ID_USUARIO,
            subtotal: subtotal,
            desconto: desconto,
            vl_total: total,
            itens: itens
        };

            const response = await api.post("pedidos", ped);

            if(response.data){
              ClickLimpar();
        }
    }catch (error) {
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    useEffect(() => {
        CalculaValores();
        
        nav.setOptions({headerRight: () => {
                    return <TouchableOpacity onPress={() => ClickLimpar()}>
                        <Text style={styles.btnLimpar}>Limpar</Text>
                    </TouchableOpacity>
                }});
    }, []);

    
    

    return <View style={styles.container}>

        <FlatList data={itens}
            keyExtractor={(item) => item.id_item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                return <Produto 
                    foto={item.icone}
                    nome={item.nome}
                    descricao={item.descricao}
                    obs={item.obs}
                    qtd={item.qtd}
                    valor={item.vl_total}
                    id_item={item.id_item}
                    onClickDelete={ClickDelete} />
            }}
        />

        <View>
            <View style={styles.valores}>
                <Text style={styles.total}>Resumo dos Valores</Text>
            </View>

            <View style={styles.valores}>
                <Text style={styles.valor}>Subtotal</Text>
                <Text style={styles.valor}>{new Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" }).format(subtotal)}</Text>
            </View>

            <View style={styles.valores}>
                <Text style={styles.valor}>Desconto</Text>
                <Text style={styles.valor}>{new Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" }).format(desconto)}</Text>
            </View>

            <View style={styles.valores}>
                <Text style={styles.total}>Total</Text>
                <Text style={styles.total}>{new Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" }).format(total)}</Text>
            </View>
        </View>

        <View style={styles.conatinerBtn}>
            <Button texto="Finalizar Pedido" onPress={ClickFinalizar} />
        </View>

    </View>
}

export default Checkout;