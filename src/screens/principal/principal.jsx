import React, { useContext, useEffect } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import icons from "../../constants/icons.js";

import AbaHome from "../../screens/aba-home/aba-home.jsx";
import AbaFavoritos from "../../screens/aba-favoritos/aba-favoritos.jsx";
import AbaPedidos from "../../screens/aba-pedidos/aba-pedidos.jsx";
import AbaPerfil from "../../screens/aba-perfil/aba-perfil.jsx";

import { AuthContext } from "../../contexts/auth.js";
import { useNavigation } from "@react-navigation/native";
import AdminHome from "../admin/admin-home/admin-home.jsx";

const Tab = createBottomTabNavigator();

function Principal(props) {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    useEffect(() => {
        // Se for administrador, redirecionar para painel admin
        if (user?.TIPO === "administrador") {
            navigation.replace("admin-home");
        }
    }, [user, navigation]);

    // Se for admin, não mostrar as abas normais
    if (user?.TIPO === "administrador") {
        return <AdminHome navigation={props.navigation} />;
    }

    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="home" component={AbaHome} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Image source={icons.abaHome}
                        style={{ width: 25, height: 25, opacity: focused ? 1 : 0.3 }} />
                )
            }} />

            <Tab.Screen name="favoritos" component={AbaFavoritos} options={{
                title: "Favoritos",
                headerTitleAlign: "center",
                headerShadowVisible: false,
                tabBarIcon: ({ focused }) => (
                    <Image source={icons.abafavorito}
                        style={{ width: 25, height: 25, opacity: focused ? 1 : 0.3 }} />
                )
            }} />

            <Tab.Screen name="pedidos" component={AbaPedidos} options={{
                title: "Pedidos",
                headerTitleAlign: "center",
                headerShadowVisible: false,
                tabBarIcon: ({ focused }) => (
                    <Image source={icons.abaPedido}
                        style={{ width: 25, height: 25, opacity: focused ? 1 : 0.3 }} />
                )
            }} />

            <Tab.Screen name="perfil" component={AbaPerfil} options={{
                title: "Meu Perfil",
                headerTitleAlign: "center",
                headerShadowVisible: false,
                tabBarIcon: ({ focused }) => (
                    <Image source={icons.abaPerfil}
                        style={{ width: 25, height: 25, opacity: focused ? 1 : 0.3 }} />
                )
            }} />

        </Tab.Navigator>
    );
}

export default Principal;