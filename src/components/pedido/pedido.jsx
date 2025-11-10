import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./pedido.style.js";
import icons from "../../constants/icons.js";

function Pedido(props) {


    const dt = new Date(props.dt_pedido);
    const idPedido = props.id_pedido ?? props.ID_PEDIDO;

    return <TouchableOpacity style={styles.pedido} 
        onPress={() => props.onClickPedido(idPedido)}>
        <Image source={props.logotipo} style={styles.logotipo} /> 
        <View style={styles.textos}>
            <Text style={styles.nome}>{props.nome}</Text>

            <View style={styles.containerValor}>
                <Text style={styles.valor}>
                    {
                        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(props.valor)
                    }
                </Text>
                <Text style={styles.valor}>{dt.toLocaleDateString()}</Text>
            </View>
            <Text style={styles.status}>Pedido: {idPedido} - {props.status}
            </Text>
        </View>

        {
            props.onClickDelete &&
            <TouchableOpacity style={styles.containerDelete}
                onPress={(e) => {
                    e.stopPropagation(); // Impede que abra o detalhe do pedido
                    props.onClickDelete(idPedido);
                }}>
                <Image source={icons.remove} style={styles.delete} />
            </TouchableOpacity>
        }

    </TouchableOpacity>
}

export default Pedido;