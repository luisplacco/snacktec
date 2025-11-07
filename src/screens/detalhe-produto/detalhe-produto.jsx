import { Image, TouchableOpacity, View, Text, TextInput, TouchableOpacityBase } from "react-native";
import { styles } from "./detalhe-produto.style.js";
import icons from "../../constants/icons.js";
import Button from "../../components/button/button.jsx";
import React, { useEffect, useState } from "react";
import api from "../../constants/api.js";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useContext } from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { CartContext } from "../../contexts/cart.js";


function DetalheProduto(props) {

    const id_produto = props.route?.params?.ID_PRODUTO ?? props.route?.params?.id_produto;

    const [produto, setProduto] = useState({});
    const [qtd, setQtd] = useState(1);
    const [obs, setObs] = useState("");
    

    const {AddItem} = useContext(CartContext);

    function AddProdutoCart(){
        const item = {
            id_item: uuidv4(),
            id_produto: id_produto,
            icone: produto.ICONE,
            nome: produto.NOME,
            descricao: produto.DESCRICAO,
            obs: obs,
            qtd: qtd,
            valor: produto.PRECO,
            vl_total: produto.PRECO * qtd,
        }

        AddItem(item);

        props.navigation.goBack();
    }

    async function LoadProduto(id_produto) {
        if (!id_produto) {
            console.log("LoadProduto: missing id_produto", id_produto);
            return;
        }
        try {
            const response = await api.get("/produtos/" + id_produto);
            if (response.data) {
                setProduto(response.data);
            }
        } catch (error) {
            if (error.response?.data?.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    function AlterarQtd(valor) {
        if (qtd + valor < 1)
            return;

        setQtd(qtd + valor);
    }

       useFocusEffect(
                React.useCallback(() => {
                    LoadProduto(id_produto);
                }, [id_produto]) // roda quando o id chega/alterar
            );
















    return <View style={styles.container}>
        <View style={styles.containerFoto}>
            <Image source={{uri: produto.ICONE}} style={styles.foto} />

            <TouchableOpacity style={styles.containerBack} onPress={props.navigation.goBack}>
                <Image source={icons.back2} style={styles.back} />
            </TouchableOpacity>
        </View>

        <View style={styles.header}>
            <View style={styles.headerTextos}>
                <Text style={styles.nome}>{produto.NOME ?? produto.nome}</Text>
                <Text style={styles.descricao}>{produto.DESCRICAO ?? produto.descricao}</Text>
                <Text style={styles.valor}>{new Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" }).format(produto.PRECO)}</Text>
            </View>
        </View>

        <View style={styles.headerObs}>
            <Text style={styles.descricao}>Observações</Text>
            <TextInput style={styles.multiline}
                multiline={true}
                numberOfLines={5}
                onChangeText={(text) => setObs(text)} />
        </View>

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => AlterarQtd(-1)}>
                <Image source={icons.menos} style={styles.imgQtd} />
            </TouchableOpacity> 

            <Text style={styles.qtd}>{qtd}</Text>

            <TouchableOpacity onPress={() => AlterarQtd(1)}>
                <Image source={icons.mais} style={styles.imgQtd} />
            </TouchableOpacity>

            <View style={styles.footerBtn}>
                <Button texto="Inserir" onPress={AddProdutoCart} />
            </View>
        </View>

    </View>
}

export default DetalheProduto;