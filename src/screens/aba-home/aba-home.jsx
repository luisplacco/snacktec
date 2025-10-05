import { Image, View, Text, ScrollView } from "react-native";
import { styles } from "./aba-home.style.js";
import icons from "../../constants/icons.js";
import { SafeAreaView } from "react-native-safe-area-context";
import TextBox from "../../components/textbox/textbox.jsx";
import { useState } from "react";
import Categorias from "../../components/categorias/categorias.jsx";
import { categorias, banners, restaurantes } from "../../constants/dados.js"; // produtosDestaque se tiver
import Banners from "../../components/banners/banners.jsx";
import Restaurante from "../../components/restaurante/restaurante.jsx";

function AbaHome() {
    const [busca, setBusca] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerBar}>
                <Image source={icons.logo} style={styles.logo} />
                <Image source={icons.cart} style={styles.cart} />
            </View>

            {/* Campo de busca */}
            <View style={styles.busca}>
                <TextBox
                    placeholder="O que vamos pedir hoje?"
                    onChangeText={(texto) => setBusca(texto)}
                    value={busca}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Categorias */}
                <Categorias dados={categorias} />

                {/* Banners */}
                <Banners dados={banners} />

                {/* Título Destaques */}
                <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#414141ff" }}>
                        Destaques
                    </Text>
                </View>

                {/* Lista de produtos/restaurantes */}
                {restaurantes.map((restaurante, index) => (
                    <View key={index} style={{ marginBottom: 5 }}>
                        <Restaurante
                            logotipo={restaurante.logotipo}
                            nome={restaurante.nome}
                            endereco={restaurante.endereco} // mantém como “preço” se quiser
                            icone={icons.favoritoFull}
                        />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default AbaHome;
