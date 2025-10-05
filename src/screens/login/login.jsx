import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from "./login.style.js";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";
import { LoadUsuario, SaveUsuario } from "../../storage/storage.usuario.js";

function Login(props) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    async function ProcessarLogin() {
       try {
        setLoading(true);
        const response = await api.post("/usuarios/login", {
            ra:email,
            senha
        }); 
        await SaveUsuario(response.data);
       
        Alert.alert("Sucesso", "Login realizado com sucesso!");
    }
    catch (error) {
        setLoading(false);
        await SaveUsuario({});
        if(error.response?.data.error)
            Alert.alert("Erro", error.response.data.error);
        else 
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
}

 async function CarregarDados() {
    try {  
        const usuario = await LoadUsuario();
      if (usuario.token) 
        Alert.alert("Bem-vindo de volta!");
      
    } catch (error) {
        console.log("Erro ao carregar dados do usuário");
    }
 }

useEffect(() => {
    CarregarDados();
       
}, []);

    return <View style={styles.container}>
        <Header texto={email} />

        <View style={styles.formGroup}>
            <View style={styles.form}>
                <TextBox label="E-mail"
                    onChangeText={(texto) => setEmail(texto)}
                    value={email} />
            </View>

            <View style={styles.form}>
                <TextBox label="Senha" isPassword={true}
                    onChangeText={(texto) => setSenha(texto)}
                    value={senha} />
            </View>

            <View style={styles.form}>
                <Button texto="Acessar" onPress={ProcessarLogin} isLoading={loading} />
            </View>
        </View>

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => props.navigation.navigate("registro")}>
                <Text style={styles.footerText}>Criar minha conta.</Text>
            </TouchableOpacity>
        </View>
    </View>
}


export default Login;