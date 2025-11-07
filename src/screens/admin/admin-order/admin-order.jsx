import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../../constants/api.js";
import { styles } from "./admin-order.style.js";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadOrders() {
    setLoading(true);
    try {
      // ajuste endpoint conforme seu backend (ex: /admin/orders)
      const resp = await api.get("/pedidos");
      setOrders(resp.data ?? []);
    } catch (error) {
      console.log("loadOrders error:", error);
      Alert.alert("Error", "Could not load orders");
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(id, nextStatus) {
    try {
      // ajuste método/rota conforme backend
      await api.put(`/pedidos/${id}/status`, { status: nextStatus });
      Alert.alert("Success", "Status updated");
      loadOrders();
    } catch (error) {
      console.log("changeStatus error:", error);
      Alert.alert("Error", "Could not change status");
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadOrders();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(o) => (o.ID_PEDIDO ?? o.id ?? Math.random()).toString()}
        refreshing={loading}
        onRefresh={loadOrders}
        renderItem={({ item }) => (
          <View style={styles.order}>
            <View style={{ flex: 1 }}>
              <Text style={styles.orderTitle}>Order #{item.ID_PEDIDO ?? item.id}</Text>
              <Text>Status: {item.STATUS ?? item.status}</Text>
              <Text>Total: R$ {(item.VL_TOTAL ?? item.vl_total ?? 0).toFixed(2)}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => changeStatus(item.ID_PEDIDO ?? item.id, "E")}
              >
                <Text style={styles.btnText}>Mark Preparing</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#2ecc71" }]}
                onPress={() => changeStatus(item.ID_PEDIDO ?? item.id, "F")}
              >
                <Text style={styles.btnText}>Mark Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => <Text>No orders found</Text>}
      />
    </View>
  );
}