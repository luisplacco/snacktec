import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { styles } from "./registro.style.js";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState, useContext } from "react";
import api from "../../constants/api.js";
import { SaveUsuario } from "../../storage/storage.usuario.js";
import { AuthContext } from "../../contexts/auth.js";

function Registro(props) {
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState("");
    const [ra, setRa] = useState("");
    const [email, setEmail] = useState("");
    const [senha1, setSenha1] = useState("");
    const [senha2, setSenha2] = useState("");
    const { setUser } = useContext(AuthContext);

    async function ProcessarNovaConta() {
        if (senha1 !== senha2) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }
        try {
            setLoading(true);
            const response = await api.post("/usuarios", {
                nome,
                ra,
                email,
                senha: senha1,
            });

            if (response.data) {
                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
                await SaveUsuario(response.data);
                setUser(response.data);
                Alert.alert("Conta criada com sucesso!");
                
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response?.data.error)
                Alert.alert("Erro", error.response.data.error);
            else
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Header texto="Criar sua conta." />
                <View style={styles.formGroup}>
                    <View style={styles.form}>
                        <TextBox label="Nome Completo" onChangeText={setNome} value={nome} />
                    </View>
                    <View style={styles.form}>
                        <TextBox label="RA" onChangeText={setRa} value={ra} />
                    </View>
                    <View style={styles.form}>
                        <TextBox label="E-mail" onChangeText={setEmail} value={email} />
                    </View>
                    <View style={styles.form}>
                        <TextBox label="Escolha uma senha" isPassword={true} onChangeText={setSenha1} value={senha1} />
                    </View>
                    <View style={styles.form}>
                        <TextBox label="Confirme a senha" isPassword={true} onChangeText={setSenha2} value={senha2} />
                    </View>
                    <View style={styles.form}>
                        <Button texto="Criar minha conta" onPress={ProcessarNovaConta} isLoading={loading} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Registro;