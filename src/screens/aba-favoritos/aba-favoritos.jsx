import { Alert,FlatList, Image, Text, View, } from "react-native";
import { useEffect, useState } from "react";
import Restaurante from "../../components/restaurante/restaurante.jsx";
import icons from "../../constants/icons.js";
import { styles } from "./aba-favoritos.style.js";
import api from "../../constants/api.js";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native"; 
import { useIsFocused } from "@react-navigation/native";


function AbaFavoritos() {
    const navigation = useNavigation();
    const [restaurantes, setRestaurantes] = useState([]);



     async function LoadFavoritos() {
        try {
            const response = await api.get("usuarios/favoritos");
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
    useFocusEffect(
        React.useCallback(() => {
            LoadFavoritos();
        }, [])
    );


    async function DeleteFavoritos(id) {
   

        try {

            const response = await api.delete("produtos/" + id +"/favoritos");

            if(response.data){
                LoadFavoritos();
        }
    }catch (error) {
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }
    


  

    useEffect(() => {
        LoadFavoritos();
    }, []);


    return <View style={styles.container}>
        <FlatList data={restaurantes}
            keyExtractor={(restaurante) => restaurante.ID_PRODUTO.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <Restaurante
                    id_produto= {item.ID_PRODUTO}
                     nome={item.NOME}
                    logotipo={item.ICONE}
                    icone={icons.remove}
                    onPress={() => navigation.navigate("detalhe-produto")}
                    onClickIcon={DeleteFavoritos}
/>
            )}

            contentContainerStyle={styles.containerList}

            ListEmptyComponent={() => {
                return <View style={styles.empty}>
                    <Image source={icons.empty} />
                    <Text style={styles.emptyText}>Nenhum favorito encontrado</Text>
                </View>
            }}
        />
    </View>
}

export default AbaFavoritos;