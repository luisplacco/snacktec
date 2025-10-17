import { Image, TouchableOpacity, View, Text, FlatList } from "react-native";
import { styles } from "./pedido-detalhe.style.js";
import icons from "../../constants/icons.js";
import { pedido } from "../../constants/dados.js";
import Produto from "../../components/produto/produto.jsx";
import api from "../../constants/api.js";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";

function DetalhePedido(props) {

    const id_pedido = props.route?.params?.ID_PEDIDO ?? props.route?.params?.id_pedido;
    const [pedido, setPedido] = useState({});


    async function LoadPedido() {
        try {
            const response = await api.get("/pedidos/" + id_pedido);
            if (response.data) {
                setPedido(response.data);
            }
        } catch (error) {
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }


       useFocusEffect(
                React.useCallback(() => {
                    LoadPedido();
                }, [])
            );


    return <View style={styles.container}>

        <View style={styles.containerPedido}>
            <Text style={styles.textPedido}> Pedido: {id_pedido}</Text>
        </View>
        

        <FlatList data={pedido.itens}
            keyExtractor={(item) => item.idItem}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                return <Produto key={item.idItem}
                    foto={item.ICONE}
                    nome={item.NOME}
                    qtd={item.QTD}
                    descricao={item.DESCRICAO}
                    valor={item.VL_TOTAL} />
            }}
        />

        <View>
            <View style={styles.valores}>
                <Text style={styles.total}>Resumo dos Valores</Text>
            </View>

            <View style={styles.valores}>
                <Text style={styles.valor}>Valor Total</Text>
                <Text style={styles.valor}>{
                new Intl.NumberFormat("pt-BR",
                    { style: "currency", currency: "BRL" }).format(pedido.VL_TOTAL)
            }</Text>
            </View>

            <View style={styles.valores}>
                <Text style={styles.valor}>Desconto</Text>
                <Text style={styles.valor}>{
                new Intl.NumberFormat("pt-BR",
                    { style: "currency", currency: "BRL" }).format(pedido.DESCONTO)
            }</Text>
            </View>

            <View style={styles.valores}>
                <Text style={styles.total}>Subtotal</Text>
                <Text style={styles.total}>{
                new Intl.NumberFormat("pt-BR",
                    { style: "currency", currency: "BRL" }).format(pedido.SUBTOTAL)
            }</Text>
            </View>
        </View>

    </View>
}

export default DetalhePedido;