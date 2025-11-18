import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./aba-perfil.style.js";
import icons from "../../constants/icons.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.js";

function AbaPerfil(props) {
    const { setUser } = useContext(AuthContext);

    async function handleLogout() {
    await AsyncStorage.removeItem("usuario");
    setUser({});
}

    return <View style={styles.container}>

        <TouchableOpacity style={[styles.item, styles.borderTop]} onPress={() => {
            console.log("Clicando em Meus Dados...");
            props.navigation.navigate("meus-dados");
        }}>
            <View style={styles.containerIcone}>
                <Image source={icons.dados} style={styles.icone} />
            </View>
            <View style={styles.textos}>
                <Text style={styles.titulo}>Meus Dados</Text>
                <Text style={styles.subtitulo}>Informações da minha conta</Text>
            </View>
            <View style={styles.containerIcone}>
                <Image source={icons.more} style={styles.more} />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {
            props.navigation.navigate("chat");
        }}>
            <View style={styles.containerIcone}>
                <Text style={styles.iconeEmoji}>💬</Text>
            </View>
            <View style={styles.textos}>
                <Text style={styles.titulo}>Suporte</Text>
                <Text style={styles.subtitulo}>Tire suas dúvidas conosco</Text>
            </View>
            <View style={styles.containerIcone}>
                <Image source={icons.more} style={styles.more} />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleLogout}>
            <View style={styles.containerIcone}>
                <Image source={icons.logout} style={styles.icone} />
            </View>
            <View style={styles.textos}>
                <Text style={styles.titulo}>Desconectar</Text>
                <Text style={styles.subtitulo}>Desconectar seu usuário desse aparelho</Text>
            </View>
            <View style={styles.containerIcone}>
                <Image source={icons.more} style={styles.more} />
            </View>
        </TouchableOpacity>

    </View>
}

export default AbaPerfil;