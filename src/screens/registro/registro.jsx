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

    function validarRA(ra) {
        // Remove espaços e caracteres não numéricos
        const raLimpo = ra.replace(/\D/g, '');
        
        // Verificar se tem apenas números
        if (!/^\d+$/.test(raLimpo)) {
            return { valido: false, erro: "RA deve conter apenas números." };
        }
        
        // Verificar tamanho (entre 10 e 15 dígitos)
        if (raLimpo.length < 10) {
            return { valido: false, erro: "RA deve ter pelo menos 10 dígitos." };
        }
        
        if (raLimpo.length > 15) {
            return { valido: false, erro: "RA deve ter no máximo 15 dígitos." };
        }
        
        // Verificar sequências óbvias
        const sequenciasInvalidas = [
            '1111111111', '2222222222', '3333333333', '4444444444', '5555555555',
            '6666666666', '7777777777', '8888888888', '9999999999', '0000000000',
            '1234567890', '0987654321', '12345', '54321', '123456789', '987654321'
        ];
        
        for (let sequencia of sequenciasInvalidas) {
            if (raLimpo.includes(sequencia)) {
                return { valido: false, erro: "RA não pode conter sequências óbvias como 12345 ou 11111." };
            }
        }
        
        // Verificar se não é muito simples (menos de 4 dígitos únicos em RAs longos)
        const digitosUnicos = [...new Set(raLimpo)].length;
        if (raLimpo.length >= 10 && digitosUnicos < 4) {
            return { valido: false, erro: "RA deve conter pelo menos 4 dígitos diferentes." };
        }
        
        return { valido: true };
    }

    async function ProcessarNovaConta() {
        // Validações de campos obrigatórios
        if (!nome.trim()) {
            Alert.alert("Erro", "Nome completo é obrigatório.");
            return;
        }
        
        if (!ra.trim()) {
            Alert.alert("Erro", "RA é obrigatório.");
            return;
        }
        
        // Validação do RA
        const validacaoRA = validarRA(ra);
        if (!validacaoRA.valido) {
            Alert.alert("Erro", validacaoRA.erro);
            return;
        }
        
        if (!email.trim()) {
            Alert.alert("Erro", "E-mail é obrigatório.");
            return;
        }
        
        if (!senha1.trim()) {
            Alert.alert("Erro", "Senha é obrigatória.");
            return;
        }
        
        if (!senha2.trim()) {
            Alert.alert("Erro", "Confirmação de senha é obrigatória.");
            return;
        }

        // Validação de formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Erro", "E-mail deve ter um formato válido.");
            return;
        }

        // Validação de tamanho da senha
        if (senha1.length < 4) {
            Alert.alert("Erro", "A senha deve ter pelo menos 4 caracteres.");
            return;
        }

        if (senha1 !== senha2) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }
        
        try {
            setLoading(true);
            
            // Debug: mostrar dados que serão enviados
            console.log("📤 Dados do registro:", { nome, ra, email, senha: senha1 });
            
            const response = await api.post("/usuarios", {
                nome,
                ra,
                email,
                senha: senha1,
            });

            console.log("✅ Response do servidor:", response.data);

            if (response.data) {
                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
                await SaveUsuario(response.data);
                setUser(response.data);
                Alert.alert("Conta criada com sucesso!");
                
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            
            // Debug: log completo do erro
            console.log("❌ Erro completo:", error);
            console.log("📋 Detalhes do erro:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                url: error.config?.url,
                method: error.config?.method,
                sentData: error.config?.data
            });
            
            if (error.response?.data?.error)
                Alert.alert("Erro", error.response.data.error);
            else if (error.code === 'NETWORK_ERROR')
                Alert.alert("Erro", "Erro de rede. Verifique se o backend está rodando na porta 3001.");
            else
                Alert.alert("Erro", `Não foi possível conectar ao servidor. Status: ${error.response?.status || 'Desconhecido'}`);
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
                        <TextBox 
                            label="RA (10-15 dígitos)" 
                            placeholder="Ex: 1961432512008"
                            onChangeText={setRa} 
                            value={ra}
                            keyboardType="numeric"
                            maxLength={15}
                        />
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