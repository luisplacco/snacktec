import { Image, View, Text, ScrollView } from "react-native";
import { styles } from "./aba-home.style.js";
import icons from "../../constants/icons.js";
import { SafeAreaView } from "react-native-safe-area-context";
import TextBox from "../../components/textbox/textbox.jsx";
import { useEffect, useState } from "react";
import Categorias from "../../components/categorias/categorias.jsx";
import Banners from "../../components/banners/banners.jsx";
import Restaurante from "../../components/restaurante/restaurante.jsx";
import api from "../../constants/api.js";
import { Alert } from "react-native";
import {OpenDetalhe} from "../aba-favoritos/aba-favoritos.jsx";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";





function Home() {
    const navigation = useNavigation();

    async function LoadCategory() {
        try {
            
            const response = await api.get("/categorias");
           
            if(response.data){
                setCategorias(response.data);
        }
    }catch (error) {
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    async function LoadBanners() {
        try {

            const response = await api.get("/banners");

            if(response.data){
                setBanners(response.data);
        }
    }catch (error) {
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    async function LoadDestaques() {
        try {
            
            const response = await api.get("/produtos/destaque");
           
            if(response.data){
                setDestaques(response.data);
        }
    }catch (error) {
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    async function DeleteFavoritos(id) {
        try {

            const response = await api.delete("produtos/" + id +"/favoritos");

            if(response.data){
               LoadDestaques();
        }
    }catch (error) {
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    

    async function AddFavoritos(id) {
        try {

            const response = await api.post("produtos/" + id +"/favoritos");

            if(response.data){
              LoadDestaques();
        }
    }catch (error) {
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }


    useFocusEffect(
            React.useCallback(() => {
                LoadDestaques();
            }, [])
        );


    const [busca, setBusca] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [banners, setBanners] = useState([]);
    const [destaques, setDestaques] = useState([]);

    useEffect(() => {
        LoadCategory();
        LoadBanners();
        LoadDestaques();
    }, []);

    return <SafeAreaView style={styles.container}>
        <View style={styles.headerBar}>
            <Image source={icons.logo} style={styles.logo} />
            <Image source={icons.cart} style={styles.cart} />
        </View>

        <View style={styles.busca}>
            <TextBox placeholder="O que vamos pedir hoje?"
                onChangeText={(texto) => setBusca(texto)}
                value={busca} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

            <Categorias dados={categorias} />

            <Banners dados={banners} />

            <View>
                <Text style={styles.destaques}>Destaques</Text>
            </View>

            {
    destaques.map((produto, index) => (
        <View key={index}>
            <Restaurante
    id_produto={produto.ID_PRODUTO}
    logotipo={produto.ICONE}
    nome={produto.NOME}
    endereco={produto.PRECO ? `R$ ${produto.PRECO.toFixed(2)}` : ""}
    icone={produto.FAVORITO === "S" ? icons.favoritoFull : icons.favorito}
    onPress={() => navigation.navigate("detalhe-produto", { id: produto.ID_PRODUTO })}
    onClickIcon={
        produto.FAVORITO === "S"
            ? () => DeleteFavoritos(produto.ID_PRODUTO)
            : () => AddFavoritos(produto.ID_PRODUTO)
    }      
            />
        </View>
    ))
}
        </ScrollView>

    </SafeAreaView>
}

export default Home;