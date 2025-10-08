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

function Home() {

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
            <Restaurante // ou crie um componente Produto
                logotipo={produto.ICONE}
                nome={produto.NOME}
                endereco={produto.PRECO ? `R$ ${produto.PRECO.toFixed(2)}` : ""}
                icone={produto.FAVORITO === "S" ? icons.favoritoFull : icons.favorito}
               
            />
        </View>
    ))
}
        </ScrollView>

    </SafeAreaView>
}

export default Home;