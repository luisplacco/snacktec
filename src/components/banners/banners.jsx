import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./banners.style.js";

function Banners(props) {
    return (
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {props.dados.map((banner, index) => (
                    <View key={index} style={styles.banner}>
                        <TouchableOpacity onPress={() => props.onClick(banner)}>
                            <Image style={styles.icone} source={{ uri: banner.ICONE }} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default Banners;