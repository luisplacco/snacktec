import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput, SafeAreaView, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../../constants/api.js";
import { styles } from "./admin-products.style.js";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ 
    NOME: "", 
    PRECO: "", 
    DESCRICAO: "",
    ID_CATEGORIA: "1" // Categoria padrão (você pode ajustar conforme suas categorias)
  });

  // Função para obter nome da categoria
  function getCategoriaName(idCategoria) {
    const categorias = {
      1: " Lanches",
      2: " Bebidas", 
      3: " Doces"
    };
    return categorias[idCategoria] || `Categoria ${idCategoria}`;
  }

  async function loadProducts() {
    setLoading(true);
    try {
      const resp = await api.get("/admin/produtos");
      setProducts(resp.data ?? []);
    } catch (error) {
      console.log("loadProducts error:", error);
      Alert.alert("Erro", "Não foi possível carregar os produtos");
    } finally {
      setLoading(false);
    }
  }

  async function saveProduct() {
    if (!form.NOME.trim() || !form.PRECO.trim() || !form.ID_CATEGORIA) {
      Alert.alert("Atenção", "Por favor, preencha nome, preço e categoria do produto");
      return;
    }

    try {
      const productData = {
        NOME: form.NOME.trim(),
        PRECO: parseFloat(form.PRECO.replace(',', '.')),
        DESCRICAO: form.DESCRICAO.trim() || null,
        ID_CATEGORIA: parseInt(form.ID_CATEGORIA)
      };

      if (editingProduct) {
        await api.put(`/admin/produtos/${editingProduct.ID_PRODUTO}`, productData);
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      } else {
        await api.post("/admin/produtos", productData);
        Alert.alert("Sucesso", "Produto adicionado com sucesso!");
      }
      
      closeModal();
      loadProducts();
    } catch (error) {
      console.log("saveProduct error:", error);
      Alert.alert("Erro", "Não foi possível salvar o produto");
    }
  }

  function openAddModal() {
    setEditingProduct(null);
    setForm({ NOME: "", PRECO: "", DESCRICAO: "", ID_CATEGORIA: "1" });
    setModalVisible(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);
    setForm({
      NOME: product.NOME || "",
      PRECO: product.PRECO?.toString() || "",
      DESCRICAO: product.DESCRICAO || "",
      ID_CATEGORIA: product.ID_CATEGORIA?.toString() || "1"
    });
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setEditingProduct(null);
    setForm({ NOME: "", PRECO: "", DESCRICAO: "", ID_CATEGORIA: "1" });
  }

  function deleteProduct(product) {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir "${product.NOME}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/admin/produtos/${product.ID_PRODUTO}`);
              Alert.alert("Sucesso", "Produto excluído com sucesso!");
              loadProducts();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir o produto");
            }
          }
        }
      ]
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addBtn} onPress={openAddModal}>
          <Text style={styles.addBtnText}>➕ Adicionar Produto</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(p) => (p.ID_PRODUTO ?? p.id ?? Math.random()).toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadProducts} />
        }
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.NOME}</Text>
              <Text style={styles.productPrice}>
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.PRECO || 0)}
              </Text>
              {item.DESCRICAO ? (
                <Text style={styles.productDescription}>{item.DESCRICAO}</Text>
              ) : null}
              {item.ID_CATEGORIA ? (
                <Text style={styles.productCategory}>{getCategoriaName(item.ID_CATEGORIA)}</Text>
              ) : null}
            </View>

            <View style={styles.productActions}>
              <TouchableOpacity 
                style={styles.editBtn} 
                onPress={() => openEditModal(item)}
              >
                <Text style={styles.editBtnText}>Editar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.deleteBtn} 
                onPress={() => deleteProduct(item)}
              >
                <Text style={styles.deleteBtnText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📦</Text>
            <Text style={styles.emptyTitle}>Nenhum produto cadastrado</Text>
            <Text style={styles.emptySubtext}>Adicione produtos ao seu cardápio</Text>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingProduct ? " Editar Produto" : "➕ Novo Produto"}
            </Text>
            
            <TextInput 
              placeholder="Nome do produto" 
              value={form.NOME} 
              onChangeText={(t) => setForm({ ...form, NOME: t })} 
              style={styles.input} 
            />
            
            <TextInput 
              placeholder="Preço (ex: 15,90)" 
              value={form.PRECO} 
              onChangeText={(t) => setForm({ ...form, PRECO: t })} 
              keyboardType="numeric" 
              style={styles.input} 
            />
            
            <TextInput 
              placeholder="Descrição (opcional)" 
              value={form.DESCRICAO} 
              onChangeText={(t) => setForm({ ...form, DESCRICAO: t })} 
              style={styles.input}
              multiline 
            />
            
            <View style={styles.categoriaContainer}>
              <Text style={styles.categoriaLabel}>Categoria:</Text>
              <View style={styles.categoriaButtons}>
                <TouchableOpacity 
                  style={[styles.categoriaBtn, form.ID_CATEGORIA === "1" && styles.categoriaBtnSelected]} 
                  onPress={() => setForm({ ...form, ID_CATEGORIA: "1" })}
                >
                  <Text style={[styles.categoriaBtnText, form.ID_CATEGORIA === "1" && styles.categoriaBtnTextSelected]}> Lanches</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.categoriaBtn, form.ID_CATEGORIA === "2" && styles.categoriaBtnSelected]} 
                  onPress={() => setForm({ ...form, ID_CATEGORIA: "2" })}
                >
                  <Text style={[styles.categoriaBtnText, form.ID_CATEGORIA === "2" && styles.categoriaBtnTextSelected]}> Bebidas</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.categoriaBtn, form.ID_CATEGORIA === "3" && styles.categoriaBtnSelected]} 
                  onPress={() => setForm({ ...form, ID_CATEGORIA: "3" })}
                >
                  <Text style={[styles.categoriaBtnText, form.ID_CATEGORIA === "3" && styles.categoriaBtnTextSelected]}> Doces</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveBtn} onPress={saveProduct}>
                <Text style={styles.saveBtnText}>
                  {editingProduct ? " Atualizar" : " Salvar"}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.cancelBtn} onPress={closeModal}>
                <Text style={styles.cancelBtnText}> Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}