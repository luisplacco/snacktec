import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./admin-home.style.js";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdminHome({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  async function handleLogout() {
    await AsyncStorage.removeItem("usuario");
    setUser({});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel da Cantina</Text>
      <Text style={styles.subtitle}>Olá, {user.NOME}!</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("admin-pedidos")}>
        <Text style={styles.cardTitle}> Gerenciar Pedidos</Text>
        <Text style={styles.cardSubtitle}>Visualizar e atualizar status dos pedidos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("admin-dashboard")}>
        <Text style={styles.cardTitle}> Dashboard</Text>
        <Text style={styles.cardSubtitle}>Estatísticas e relatórios de vendas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("admin-historico")}>
        <Text style={styles.cardTitle}> Histórico de Pedidos</Text>
        <Text style={styles.cardSubtitle}>Visualizar todos os pedidos anteriores</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("admin-chat")}>
        <Text style={styles.cardTitle}>💬 Conversas</Text>
        <Text style={styles.cardSubtitle}>Responder dúvidas dos alunos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
        <Text style={styles.logoutTitle}> Sair do Painel</Text>
        <Text style={styles.logoutSubtitle}>Voltar para tela de login</Text>
      </TouchableOpacity>
    </View>
  );
}