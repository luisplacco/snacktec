import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from "./login.style.js";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useContext, useEffect, useState } from "react";
import api from "../../constants/api.js";
import { LoadUsuario, SaveUsuario } from "../../storage/storage.usuario.js";
import { AuthContext } from "../../contexts/auth.js";



// ...existing code...
function Login(props) {

    const [ra, setRa] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const {user, setUser} = useContext(AuthContext); 

    async function ProcessarLogin() {
    try {
        setLoading(true);

        // Verificar se são credenciais do administrador
        if (ra === "12345678" && senha === "marcosadm2025") {
            const adminUser = {
                ID_USUARIO: 999,
                NOME: "Marcos Silva",
                EMAIL: "marcos@gmail.com",
                RA: "12345678",
                TIPO: "administrador",
                token: "admin_token_2025"
            };

            api.defaults.headers.common['Authorization'] = "Bearer " + adminUser.token;
            await SaveUsuario(adminUser);
            setUser(adminUser);
            setLoading(false);
            return; // Sai da função para login admin
        }

        // Login normal para alunos
        const response = await api.post("/usuarios/login", {
            ra,
            senha
        });

        if (response.data) {
            api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
            const usuario = response.data;
            await SaveUsuario(usuario);
            setUser(usuario);
        }
        setLoading(false);
    } catch (error) {
        setLoading(false);
        await SaveUsuario({});
        console.log("ProcessarLogin error:", error.message, error.response || error);
        if (error.response?.data?.error)
            Alert.alert("Erro", error.response.data.error);
        else
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
}

async function CarregarDados() {
    try {
        const usuario = await LoadUsuario();
        if (usuario?.ID_USUARIO) {
            api.defaults.headers.common['Authorization'] = "Bearer " + usuario.token;
            setUser(usuario);
        }
    } catch (error) {
        console.log("Erro ao carregar dados do usuário:", error);
    }
}

    useEffect(() => {
        CarregarDados();
    }, []);

    return <View style={styles.container}>
        <Header texto={ra} />

        <View style={styles.formGroup}>
            <View style={styles.form}>
                <TextBox label="RA"
                    onChangeText={(texto) => setRa(texto)}
                    value={ra} />
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