import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./meus-dados.style.js";
import icons from "../../constants/icons.js";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.js";

function MeusDados(props) {
    const { user } = useContext(AuthContext);

    return <View style={styles.container}>
        
        <TouchableOpacity style={styles.containerBack} onPress={() => props.navigation.goBack()}>
            <Image source={icons.back2} style={styles.back} />
        </TouchableOpacity>

        <View style={styles.header}>
            <Text style={styles.title}>Meus Dados</Text>
        </View>

        <View style={styles.content}>
            <View style={styles.item}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.value}>{user.NOME || "Não informado"}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>RA:</Text>
                <Text style={styles.value}>{user.RA || "Não informado"}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user.EMAIL || "Não informado"}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>Tipo de usuário:</Text>
                <Text style={styles.value}>{user.TIPO || "Não informado"}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>ID do usuário:</Text>
                <Text style={styles.value}>{user.ID_USUARIO || "Não informado"}</Text>
            </View>
        </View>

    </View>
}

export default MeusDados;