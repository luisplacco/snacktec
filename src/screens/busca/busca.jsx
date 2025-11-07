import { FlatList, Image, Text, View, Alert } from "react-native";
import { styles } from "./busca.style.js";

import Restaurante from "../../components/restaurante/restaurante.jsx";
import icons from "../../constants/icons.js";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import React, { use } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";



function Busca(props) {



        const busca = props.route.params.termo;
        const id_categoria = props.route.params.id_categoria;
        const id_banner = props.route.params.id_banner;
    
    const navigation = useNavigation();
    const [restaurantes, setRestaurantes] = useState([]);


    async function LoadSearch(){
        try {
            const response = await api.get("/produtosDestaque",{
    params:{
        busca: busca
        ,id_categoria: id_categoria
        ,id_banner: id_banner
    }
});
            if (response.data) {
                setRestaurantes(response.data);
            }
        } catch (error) {
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    async function AddFavoritos(id_produto) {
        try {
            const response = await api.post("/produtos/" + id_produto + "/favoritos");
            if (response.data) {
                LoadSearch();
            }
        } catch (error) {
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

   async function DeleteFavoritos(id_produto) {
        try {
            const response = await api.delete("/produtos/" + id_produto + "/favoritos");
            if (response.data) {
                LoadSearch();
            }
        } catch (error) {
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    

    useEffect(() => {
        LoadSearch();
    }, []);


    return <View style={styles.container}>
        <FlatList data={restaurantes}
            keyExtractor={(restaurante) => restaurante.ID_PRODUTO.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                return <Restaurante id_produto={item.ID_PRODUTO}
                    nome={item.NOME}
                    logotipo={item.ICONE}
                    endereco={item.PRECO ? `R$ ${item.PRECO.toFixed(2)}` : ""}
                    icone={item.FAVORITO === "S" ? icons.favoritoFull : icons.favorito}
                    onPress={() => navigation.navigate("detalhe-produto", { id_produto: item.ID_PRODUTO })}
                    onClickIcon={
                        item.FAVORITO === "S"
                            ? () => DeleteFavoritos(item.ID_PRODUTO)
                            : () => AddFavoritos(item.ID_PRODUTO)
    }   
                />
            }}

            contentContainerStyle={styles.containerList}

            ListEmptyComponent={() => {
                return <View style={styles.empty}>
                    <Image source={icons.empty} />
                    <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
                </View>
            }}
        />
    </View>
}

export default Busca;