import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView } from "react-native";
import { AuthContext } from "../../../contexts/auth.js";
import { styles } from "./admin-perfil.style.js";
import { COLORS } from "../../../constants/theme.js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import api from "../../../constants/api.js";

export default function AdminPerfil() {
    const { user, logout } = useContext(AuthContext);
    const navigation = useNavigation();
    const [estatisticas, setEstatisticas] = useState({
        totalPedidos: 0,
        faturamentoTotal: 0,
        pedidosHoje: 0,
        pedidosUltimos7Dias: []
    });

    async function carregarEstatisticas() {
        try {
            const response = await api.get("/admin/pedidos");
            const pedidos = response.data || [];
            
            const hoje = new Date();
            const inicioHoje = new Date(hoje.setHours(0, 0, 0, 0));
            
            const totalPedidos = pedidos.length;
            const faturamentoTotal = pedidos.reduce((total, pedido) => total + (pedido.VL_TOTAL || 0), 0);
            const pedidosHoje = pedidos.filter(pedido => {
                const dataPedido = new Date(pedido.DT_PEDIDO);
                return dataPedido >= inicioHoje;
            }).length;
            
            setEstatisticas({
                totalPedidos,
                faturamentoTotal,
                pedidosHoje,
                pedidosUltimos7Dias: pedidos.slice(-7)
            });
        } catch (error) {
            console.log("Erro ao carregar estatísticas:", error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            carregarEstatisticas();
        }, [])
    );

    function handleLogout() {
        Alert.alert(
            "Sair do Painel",
            "Tem certeza que deseja sair do painel administrativo?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: () => logout()
                }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                
                {/* Informações do Admin */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Informações do Administrador</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Nome:</Text>
                            <Text style={styles.infoValue}>{user?.NOME || "Admin"}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Email:</Text>
                            <Text style={styles.infoValue}>{user?.EMAIL || "admin@snacktec.com"}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Tipo:</Text>
                            <Text style={[styles.infoValue, styles.adminBadge]}>
                                {user?.TIPO === "administrador" ? "Administrador" : "Usuário"}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Histórico e Estatísticas */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Histórico & Estatísticas</Text>
                    
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{estatisticas.totalPedidos}</Text>
                            <Text style={styles.statLabel}>Total de Pedidos</Text>
                        </View>
                        
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{estatisticas.pedidosHoje}</Text>
                            <Text style={styles.statLabel}>Pedidos Hoje</Text>
                        </View>
                    </View>

                    <View style={styles.faturamentoContainer}>
                        <Text style={styles.faturamentoLabel}>Faturamento Total:</Text>
                        <Text style={styles.faturamentoValue}>
                            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(estatisticas.faturamentoTotal)}
                        </Text>
                    </View>

                    <TouchableOpacity 
                        style={styles.historicoButton}
                        onPress={() => navigation.navigate('admin-historico-detalhado')}
                    >
                        <Text style={styles.historicoButtonText}>📋 Ver Histórico Completo</Text>
                    </TouchableOpacity>
                </View>

                
                

                {/* Sobre o Sistema */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Sobre o Sistema</Text>
                    <Text style={styles.aboutText}>
                        SnackTec é um sistema de pedidos online desenvolvido especificamente para cantinas escolares,
                        facilitando a gestão de pedidos e melhorando a experiência dos estudantes.
                    </Text>
                    <Text style={styles.versionText}>
                        Desenvolvido para TCC
                    </Text>
                </View>

                {/* Botão de Logout */}
                <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}> Sair do Painel</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}