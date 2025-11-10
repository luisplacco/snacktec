import React, { useState, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { styles } from "./pedido.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons.js";
import { CartContext } from "../../contexts/cart.js";

export default function Pedido({ navigation, route }) {
  const { combo } = route.params || {};
  const { AddItem } = useContext(CartContext);
  
  // Definir combos baseados no ID_BANNER
  const combosDisponiveis = {
    1: {
      titulo: "Combo Lanche Natural + Coca",
      descricao: "1 Lanche Natural + 1 Coca Cola",
      precoOriginal: 18.50,
      precoPromocional: 17.00,
      economia: 1.50,
      itens: [
        {
          nome: "Lanche Natural",
          quantidade: 1,
          preco: 12.50,
          descricao: "Lanche natural com ingredientes frescos"
        },
        {
          nome: "Coca Cola",
          quantidade: 1,
          preco: 6.00,
          descricao: "Coca Cola gelada 350ml"
        }
      ],
      imagem: "https://luisfelipe.free.nf/images/combo_seg.png"
    },
    2: {
      titulo: "Combo Coxinha + Coca",
      descricao: "1 Coxinha de Frango + 1 Coca Cola",
      precoOriginal: 13.00,
      precoPromocional: 10.00,
      economia: 3.00,
      itens: [
        {
          nome: "Coxinha de Frango",
          quantidade: 1,
          preco: 7.00,
          descricao: "Coxinha tradicional com recheio de frango"
        },
        {
          nome: "Coca Cola",
          quantidade: 1,
          preco: 6.00,
          descricao: "Coca Cola gelada 350ml"
        }
      ],
      imagem: "https://luisfelipe.free.nf/images/combo_sex.png"
    }
  };

  const comboAtual = combosDisponiveis[combo?.ID_BANNER] || combosDisponiveis[1];

  function adicionarComboAoCarrinho() {
    try {
      // Criar um item de combo único para o carrinho
      // Usar ID de produto existente (por exemplo, ID 1 = Lanche Natural, ID 3 = Coxinha)
      const idProdutoBase = combo?.ID_BANNER === 1 ? 1 : 3; // Lanche Natural ou Coxinha
      
      const itemCombo = {
        id_item: `combo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        id_produto: idProdutoBase, // Usar ID de produto real
        nome: comboAtual.titulo,
        descricao: comboAtual.descricao,
        icone: comboAtual.imagem, // Imagem específica do combo
        qtd: 1,
        valor: comboAtual.precoPromocional,
        vl_total: comboAtual.precoPromocional,
        obs: `COMBO: ${comboAtual.itens.map(item => `${item.quantidade}x ${item.nome}`).join(", ")}`,
        // Adicionar identificação de combo para o admin
        isCombo: true,
        NOME_PRODUTO: comboAtual.titulo, // Nome que aparece no admin
        VL_TOTAL: comboAtual.precoPromocional, // Valor para o admin
        QTD: 1, // Quantidade para o admin
        OBSERVACAO: ` COMBO PROMOCIONAL: ${comboAtual.itens.map(item => `${item.quantidade}x ${item.nome}`).join(", ")}`
      };

      AddItem(itemCombo);
      
      Alert.alert(
        "", 
        `${comboAtual.titulo} adicionado ao carrinho!`,
        [
          {
            text: "Continuar Comprando",
            style: "cancel"
          },
          {
            text: "Ver Carrinho",
            onPress: () => navigation.navigate("checkout")
          }
        ]
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o combo ao carrinho");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Promoção Especial</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagem do Combo */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: comboAtual.imagem }} style={styles.comboImage} />
          <View style={styles.promocaoTag}>
            <Text style={styles.promocaoText}>PROMOÇÃO</Text>
          </View>
        </View>

        {/* Informações do Combo */}
        <View style={styles.infoContainer}>
          <Text style={styles.comboTitulo}>{comboAtual.titulo}</Text>
          <Text style={styles.comboDescricao}>{comboAtual.descricao}</Text>

          {/* Preços */}
          <View style={styles.precoContainer}>
            <Text style={styles.precoOriginal}>De: R$ {comboAtual.precoOriginal.toFixed(2)}</Text>
            <View style={styles.precoPromocionalContainer}>
              <Text style={styles.precoPor}>Por apenas:</Text>
              <Text style={styles.precoPromocional}>R$ {comboAtual.precoPromocional.toFixed(2)}</Text>
            </View>
            <Text style={styles.economia}>Economia de R$ {comboAtual.economia.toFixed(2)}!</Text>
          </View>

          {/* Itens Inclusos */}
          <View style={styles.itensContainer}>
            <Text style={styles.itensTitle}> Itens inclusos:</Text>
            {comboAtual.itens.map((item, index) => (
              <View key={index} style={styles.itemInclusoContainer}>
                <View style={styles.itemQuantidade}>
                  <Text style={styles.itemQuantidadeText}>{item.quantidade}x</Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemNome}>{item.nome}</Text>
                  <Text style={styles.itemDescricao}>{item.descricao}</Text>
                  <Text style={styles.itemPrecoIndividual}>Valor individual: R$ {item.preco.toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Benefícios */}
          <View style={styles.beneficiosContainer}>
            <Text style={styles.beneficiosTitle}>✨ Por que escolher este combo?</Text>
            <View style={styles.beneficioItem}>
        
              <Text style={styles.beneficioTexto}>Economia garantida de R$ {comboAtual.economia.toFixed(2)}</Text>
            </View>
            <View style={styles.beneficioItem}>
              
              <Text style={styles.beneficioTexto}>Preparo mais rápido</Text>
            </View>
            <View style={styles.beneficioItem}>
              
              <Text style={styles.beneficioTexto}>Refeição completa</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botão de Adicionar */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.adicionarButton} onPress={adicionarComboAoCarrinho}>
          <Text style={styles.adicionarButtonText}>
             Adicionar ao Carrinho - R$ {comboAtual.precoPromocional.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}