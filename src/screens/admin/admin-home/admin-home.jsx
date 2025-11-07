import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./admin-home.style.js";

export default function AdminHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("AdminOrders")}>
        <Text style={styles.cardTitle}>Orders</Text>
        <Text style={styles.cardSubtitle}>View and manage orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("AdminProducts")}>
        <Text style={styles.cardTitle}>Products</Text>
        <Text style={styles.cardSubtitle}>Add / Edit / Remove products</Text>
      </TouchableOpacity>
    </View>
  );
}