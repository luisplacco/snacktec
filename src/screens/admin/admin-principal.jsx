import React, { useState, useEffect } from "react";
import { Image, View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from "../../constants/theme.js";
import icons from "../../constants/icons.js";
import api from "../../constants/api.js";

import AdminDashboard from "./admin-dashboard/admin-dashboard.jsx";
import AdminOrders from "./admin-order/admin-order.jsx";
import AdminProducts from "./admin-products/admin-products.jsx";
import AdminChat from "./admin-chat/admin-chat.jsx";
import AdminHistorico from "./admin-historico/admin-historico.jsx";
import AdminPerfil from "./admin-perfil/admin-perfil.jsx";

const Tab = createBottomTabNavigator();

function AdminPrincipal() {
    const [mensagensNaoLidas, setMensagensNaoLidas] = useState(0);
    const [pedidosPendentes, setPedidosPendentes] = useState(0);

    // Função para buscar mensagens não lidas
    async function carregarMensagensNaoLidas() {
        try {
            const response = await api.get("/admin/chat");
            if (response.data.success) {
                const conversas = response.data.conversas || [];
                let totalNaoLidas = 0;
                conversas.forEach(conversa => {
                    totalNaoLidas += conversa.mensagens_nao_lidas || 0;
                });
                setMensagensNaoLidas(totalNaoLidas);
            }
        } catch (error) {
            console.log("Erro ao carregar mensagens não lidas:", error);
            // Em caso de erro, definir como 0 para não quebrar a UI
            setMensagensNaoLidas(0);
        }
    }

    // Função para buscar pedidos pendentes
    async function carregarPedidosPendentes() {
        try {
            const response = await api.get("/admin/pedidos");
            if (response.data && Array.isArray(response.data)) {
                const pedidosPendentesCount = response.data.filter(pedido => 
                    !pedido.STATUS || pedido.STATUS === null
                ).length;
                setPedidosPendentes(pedidosPendentesCount);
            }
        } catch (error) {
            console.log("Erro ao carregar pedidos pendentes:", error);
            // Em caso de erro, definir como 0 para não quebrar a UI
            setPedidosPendentes(0);
        }
    }

    useEffect(() => {
        carregarMensagensNaoLidas();
        carregarPedidosPendentes();
        
        // Atualizar contadores a cada 30 segundos
        const interval = setInterval(() => {
            carregarMensagensNaoLidas();
            carregarPedidosPendentes();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    // Componente para badge de notificação
    const NotificationBadge = ({ count }) => {
        if (count === 0) return null;
        
        return (
            <View style={{
                position: 'absolute',
                right: -8,
                top: -8,
                backgroundColor: COLORS.red,
                borderRadius: 10,
                minWidth: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: 'white'
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 'bold'
                }}>
                    {count > 99 ? '99+' : count}
                </Text>
            </View>
        );
    };

    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="pedidos-admin" component={AdminOrders} options={{
                title: "Gerenciar Pedidos",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: COLORS.red },
                headerTintColor: COLORS.white,
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image source={icons.abaPedido}
                            style={{ width: 25, height: 25, opacity: focused ? 1 : 0.3 }} />
                        <NotificationBadge count={pedidosPendentes} />
                    </View>
                )
            }} />

            <Tab.Screen name="produtos-admin" component={AdminProducts} options={{
                title: "Produtos",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: COLORS.red },
                headerTintColor: COLORS.white,
                tabBarIcon: ({ focused }) => (
                    <Image source={icons.abafavorito}
                        style={{ width: 25, height: 25, opacity: focused ? 1 : 0.3 }} />
                )
            }} />

            <Tab.Screen name="chat-admin" component={AdminChat} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image source={icons.chat}
                            style={{ width: 25, height: 25, opacity: focused ? 1 : 0.3 }} />
                        <NotificationBadge count={mensagensNaoLidas} />
                    </View>
                )
            }} />

            <Tab.Screen name="dashboard" component={AdminDashboard} options={{
                title: "Dashboard",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: COLORS.red },
                headerTintColor: COLORS.white,
                tabBarIcon: ({ focused }) => (
                    <Image source={icons.abaHome}
                        style={{ width: 25, height: 25, opacity: focused ? 1 : 0.3 }} />
                )
            }} />

            <Tab.Screen name="perfil-admin" component={AdminPerfil} options={{
                title: "Perfil",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: COLORS.red },
                headerTintColor: COLORS.white,
                tabBarIcon: ({ focused }) => (
                    <Image source={icons.abaPerfil}
                        style={{ width: 25, height: 25, opacity: focused ? 1 : 0.3 }} />
                )
            }} />

        </Tab.Navigator>
    );
}

export default AdminPrincipal;