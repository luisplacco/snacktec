import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../../constants/api.js";
import { styles } from "./admin-products.style.js";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ NOME: "", PRECO: "" });

  async function loadProducts() {
    setLoading(true);
    try {
      const resp = await api.get("/produtos"); // ajuste rota
      setProducts(resp.data ?? []);
    } catch (error) {
      console.log("loadProducts error:", error);
      Alert.alert("Error", "Could not load products");
    } finally {
      setLoading(false);
    }
  }

  async function saveProduct() {
    try {
      // POST or PUT depending on form (simple demo uses POST)
      await api.post("/produtos", form);
      setModalVisible(false);
      setForm({ NOME: "", PRECO: "" });
      loadProducts();
    } catch (error) {
      console.log("saveProduct error:", error);
      Alert.alert("Error", "Could not save product");
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>

      <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.addBtnText}>+ Add Product</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(p) => (p.ID_PRODUTO ?? p.id ?? Math.random()).toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productTitle}>{item.NOME}</Text>
              <Text>Price: R$ {(item.PRECO ?? item.preco ?? 0).toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.editBtn} onPress={() => Alert.alert("Edit", "Implement edit UI")}>
              <Text style={{ color: "#fff" }}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => <Text>No products found</Text>}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: "700", marginBottom: 8 }}>New product</Text>
            <TextInput placeholder="Name" value={form.NOME} onChangeText={(t) => setForm({ ...form, NOME: t })} style={styles.input} />
            <TextInput placeholder="Price" value={form.PRECO} onChangeText={(t) => setForm({ ...form, PRECO: t })} keyboardType="numeric" style={styles.input} />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity style={styles.saveBtn} onPress={saveProduct}><Text style={{ color: "#fff" }}>Save</Text></TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}><Text>Cancel</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}