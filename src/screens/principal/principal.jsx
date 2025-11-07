import React, { useContext } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import icons from "../../constants/icons.js";

import AbaHome from "../../screens/aba-home/aba-home.jsx";
import AbaFavoritos from "../../screens/aba-favoritos/aba-favoritos.jsx";
import AbaPedidos from "../../screens/aba-pedidos/aba-pedidos.jsx";
import AbaPerfil from "../../screens/aba-perfil/aba-perfil.jsx";

// Admin stack (create this file if you haven't yet)
import AdminStack from "../admin/admin.stack.jsx";

import { AuthContext } from "../../contexts/auth.js";

const Tab = createBottomTabNavigator();

function Principal() {
    const { user } = useContext(AuthContext);

    // ajuste a condição conforme o shape do seu user (role / IS_ADMIN / ADMIN ...)
    const isAdmin = user?.role === "admin" || user?.IS_ADMIN === 1 || user?.ADMIN === true;

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

            {isAdmin && (
                <Tab.Screen name="admin" component={AdminStack} options={{
                    title: "Admin",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image source={icons.abaAdmin ?? icons.abaHome}
                            style={{ width: 25, height: 25, opacity: focused ? 1 : 0.3 }} />
                    )
                }} />
            )}

        </Tab.Navigator>
    );
}

export default Principal;