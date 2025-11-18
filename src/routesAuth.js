import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Principal from "./screens/principal/principal.jsx";
import Cardapio from "./screens/cardapio/cardapio.jsx"
import Busca from "./screens/busca/busca.jsx";
import DetalheProduto from "./screens/detalhe-produto/detalhe-produto.jsx";
import DetalhePedido from "./screens/detalhe-pedido/detalhe-pedido.jsx";
import Checkout from "./screens/checkout/checkout.jsx";
import Pedido from "./screens/pedido/pedido.jsx";
import Chat from "./screens/chat/chat.jsx";
import MeusDados from "./screens/meus-dados/meus-dados.jsx";
import AdminChatConversa from "./screens/admin/admin-chat/admin-chat-conversa.jsx";
import AdminHistorico from "./screens/admin/admin-historico/admin-historico.jsx";
import { Text, TouchableOpacity } from "react-native";
import { COLORS } from "./constants/theme.js";

const Stack = createNativeStackNavigator();

function RoutesAuth() {
    return <NavigationContainer>

        <Stack.Navigator>
            

            <Stack.Screen name="principal" component={Principal} options={{
                headerShown: false
            }} />
            <Stack.Screen name="busca" component={Busca} options={{
            title: "Resultados da busca",
                headerTitleAlign: "center",
                headerTintColor: COLORS.dark_gray,
                headerShadowVisible: false,
            }} />   

            <Stack.Screen name="checkout" component={Checkout} options={{
                headerShadowVisible: false,
                title: "Meu Pedido",
                headerTitleAlign: "center",
                
                animation: "slide_from_bottom",
            }} />

            <Stack.Screen name="detalhe-pedido" component={DetalhePedido} options={{
                headerShadowVisible: false,
                title: "Detalhes do Pedido",
                headerTitleAlign: "center",
                animation: "slide_from_bottom"
            }} />

            <Stack.Screen name="detalhe-produto" component={DetalheProduto} options={{
                headerShown: false
            }} />

            <Stack.Screen name="pedido" component={Pedido} options={{
                headerShown: false
            }} />

            <Stack.Screen name="cardapio" component={Cardapio} options={{
                headerShown: false
            }} />

            <Stack.Screen name="meus-dados" component={MeusDados} options={{
                headerShown: false
            }} />

            <Stack.Screen name="chat" component={Chat} options={{
                headerShown: false
            }} />



            <Stack.Screen name="admin-chat-conversa" component={AdminChatConversa} options={{
                headerShown: false
            }} />

            <Stack.Screen name="admin-historico-detalhado" component={AdminHistorico} options={{
                title: "Histórico Completo",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: COLORS.red },
                headerTintColor: COLORS.white,
            }} />

            
        </Stack.Navigator>

    </NavigationContainer>
}

export default RoutesAuth;