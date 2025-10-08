import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./restaurante.style.js";

function Restaurante(props) {
    return (
        <TouchableOpacity style={styles.restaurante} onPress={() => props.onPress(props.id_produto)}>
            <Image source={{ uri: props.logotipo }} style={styles.logotipo} />
            <View style={styles.textos}>
                <Text style={styles.nome}>{props.nome}</Text>
                <Text style={styles.endereco}>{props.endereco}</Text>
            </View>
            <TouchableOpacity onPress={() => props.onClickIcon(props.id_produto)}>
                <Image source={props.icone} style={styles.favorito} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

export default Restaurante;