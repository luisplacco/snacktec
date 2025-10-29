import { Image, TouchableOpacity, View, Text, FlatList, ScrollView } from "react-native";
import { styles } from "./checkout.style.js";
import icons from "../../constants/icons.js";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.js";
import Produto from "../../components/produto/produto.jsx";
import Button from "../../components/button/button.jsx";



function Checkout(props) {

    const { cart, setCart } = useContext(CartContext);

    function ClickDelete() {
        alert("OK");
    }

    return <View style={styles.container}>

        <FlatList data={cart.ITENS}
            keyExtractor={(item) => item.ID_PRODUTO}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                return <Produto key={item.ID_PRODUTO}
                    foto={item.ICONE}
                    nome={item.NOME}
                    descricao={item.DESCRICAO}
                    valor={item.VL_TOTAL}
                    onClickDelete={ClickDelete} />
            }}
        />

        <View>
            <View style={styles.valores}>
                <Text style={styles.total}>Resumo dos Valores</Text>
            </View>

            <View style={styles.valores}>
                <Text style={styles.valor}>Subtotal</Text>
                <Text style={styles.valor}>R$ 66,00</Text>
            </View>

            <View style={styles.valores}>
                <Text style={styles.valor}>Taxa de entrega</Text>
                <Text style={styles.valor}>R$ 5,00</Text>
            </View>

            <View style={styles.valores}>
                <Text style={styles.total}>Total</Text>
                <Text style={styles.total}>R$ 71,00</Text>
            </View>
        </View>

        <View style={styles.conatinerBtn}>
            <Button texto="Finalizar Pedido" />
        </View>

    </View>
}

export default Checkout;