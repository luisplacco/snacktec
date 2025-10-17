import { FlatList, Image, Text, View } from "react-native";
import { pedidos } from "../../constants/dados.js";
import icons from "../../constants/icons.js";
import { styles } from "./aba-pedidos.style.js";
import Pedido from "../../components/pedido/pedido.jsx";
import api from "../../constants/api.js";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";


function AbaPedidos(props) {

    const [pedidos, setPedidos] = useState([]);


    function DetalhePedido(id) {
        props.navigation.navigate("detalhe-pedido", { id_pedido : id });
    }

    async function LoadPedidos() {
        try {
            const response = await api.get("/pedidos");
            if (response.data) {
                setPedidos(response.data);
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
                    LoadPedidos();
                }, [])
            );



    useEffect(() => {
        LoadPedidos();
    }, []);


    return <View style={styles.container}>
        <FlatList data={pedidos}
            // keyExtractor={(ped) => ped.id}
            keyExtractor={(ped) => (ped.ID_PEDIDO ?? ped.id ?? Math.random()).toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                return <Pedido
                    logotipo={require("../../assets/cantina.png")}
                    nome={item.NOME}
                    valor={item.VL_TOTAL}
                    dt_pedido={item.DT_PEDIDO}
                    status={item.STATUS_DESCRICAO}
                    id_pedido={item.ID_PEDIDO}
                    onClickPedido={DetalhePedido} />
            }}

            contentContainerStyle={styles.containerList}

            ListEmptyComponent={() => {
                return <View style={styles.empty}>
                    <Image source={icons.empty} />
                    <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
                </View>
            }}
        />
    </View>
}

export default AbaPedidos;