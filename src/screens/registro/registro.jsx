import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./registro.style.js";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";


function Registro(props) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha1, setSenha1] = useState("");
    const [senha2, setSenha2] = useState("");

    async function ProcessarNovaConta() {
       try {
        setLoading(true);
        const response = await api.post("/usuarios", {
            nome,
            ra:email,
            senha: senha1
        }); 
        console.log(response.data);
        Alert.alert("Conta criada com sucesso!");
    }
    catch (error) {
        setLoading(false);
        if(error.response?.data.error)
            Alert.alert("Erro", error.response.data.error);
        else 
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
}

    return <>
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Header texto="Criar sua conta." />

                <View style={styles.formGroup}>
                    <View style={styles.form}>
                        <TextBox label="Nome Completo"
                            onChangeText={(texto) => setNome(texto)}
                            value={nome} />
                    </View>

                    <View style={styles.form}>
                        <TextBox label="E-mail"
                            onChangeText={(texto) => setEmail(texto)}
                            value={email} />
                    </View>

                    <View style={styles.form}>
                        <TextBox label="Escolha uma senha" isPassword={true}
                            onChangeText={(texto) => setSenha1(texto)}
                            value={senha1} />
                    </View>

                    <View style={styles.form}>
                        <TextBox label="Confirme a senha" isPassword={true}
                            onChangeText={(texto) => setSenha2(texto)}
                            value={senha2} />
                    </View>

                    <View style={styles.form}>
                                            <Button texto="Criar minha conta" onPress={ProcessarNovaConta}
                                            isLoading={loading} />
                    </View>
                </View>

            </ScrollView>
        </View>
    </>
}

export default Registro;