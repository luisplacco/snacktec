import { Image, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./aba-home.style.js";
import icons from "../../constants/icons.js";
import { SafeAreaView } from "react-native-safe-area-context";
import TextBox from "../../components/textbox/textbox.jsx";
import { useCallback, useContext, useEffect, useState } from "react";
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
import { CartContext } from "../../contexts/cart.js";

function Home(props) {
    const navigation = useNavigation();

    const {itens} = useContext(CartContext);
 
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

    function Search (){
        props.navigation.navigate("busca", {
             termo: busca 
            });
    }

    function SearchCategoria(id){
        props.navigation.navigate("busca", {
             id_categoria: id,
            });
    }
    function SearchBanner(id){
        props.navigation.navigate("busca", {
             id_banner: id,
            });
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
            <TouchableOpacity onPress={() => navigation.navigate("checkout")}>
            <Image source={icons.cart} style={styles.cart} />
            <Text style={styles.cartQtd}>{itens.length > 0 ? itens.length : 0}</Text>
            </TouchableOpacity> 
        </View>

        <View style={styles.busca}>
            <TextBox placeholder="O que vamos pedir hoje?"
                onChangeText={(texto) => setBusca(texto)}
                value={busca}
                returnKeyType="search"
                onSubmit={Search}
                
                />    
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

            <Categorias dados={categorias} onClick={SearchCategoria} />

           <Banners
    dados={banners}
    onClick={(banner) => navigation.navigate("pedido", { combo: banner })}
/>

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
    onPress={() => navigation.navigate("detalhe-produto", { id_produto: produto.ID_PRODUTO })}
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