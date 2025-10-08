import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./categorias.style.js";

function Categorias(props) {
    
    return <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
                props.dados.map((categoria, index) => {
                    return <View key={index} style={styles.categoria}>
                        <TouchableOpacity>
                            <Image style={styles.icone} source={{ uri: categoria.ICONE }} />
                            <Text style={styles.descricao}>{categoria.NOME}</Text>
                        </TouchableOpacity>
                    </View>
                })
            }
        </ScrollView>
    </View>
}

export default Categorias;