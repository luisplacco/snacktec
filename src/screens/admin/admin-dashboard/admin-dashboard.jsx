import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../../constants/api.js";
import { styles } from "./admin-dashboard.style.js";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [estatisticas, setEstatisticas] = useState({
    totalPedidos: 0,
    faturamentoTotal: 0,
    pedidosPendentes: 0,
    pedidosEmProducao: 0,
    pedidosFinalizados: 0,
    produtosMaisVendidos: [],
    faturamentoPorDia: []
  });

  async function loadEstatisticas() {
    setLoading(true);
    try {
      // Buscar todos os pedidos
      const resp = await api.get("/admin/pedidos");
      const todosPedidos = resp.data || [];
      
      // Calcular estatísticas básicas
      const totalPedidos = todosPedidos.length;
      const faturamentoTotal = todosPedidos.reduce((total, pedido) => total + (pedido.VL_TOTAL || 0), 0);
      const pedidosPendentes = todosPedidos.filter(p => !p.STATUS || p.STATUS === null).length;
      const pedidosEmProducao = todosPedidos.filter(p => p.STATUS === 'P').length;
      const pedidosFinalizados = todosPedidos.filter(p => p.STATUS === 'F').length;
      
      // Buscar itens de todos os pedidos para estatísticas de produtos
      const produtosCount = {};
      const faturamentoPorProduto = {};
      
      for (const pedido of todosPedidos) {
        try {
          const itensResp = await api.get(`/admin/pedidos/${pedido.ID_PEDIDO}/itens`);
          const itens = itensResp.data || [];
          
          itens.forEach(item => {
            const nomeProduto = item.NOME_PRODUTO || 'Produto Desconhecido';
            const qtd = item.QTD || 0;
            const valor = item.VL_TOTAL || 0;
            
            produtosCount[nomeProduto] = (produtosCount[nomeProduto] || 0) + qtd;
            faturamentoPorProduto[nomeProduto] = (faturamentoPorProduto[nomeProduto] || 0) + valor;
          });
        } catch (error) {
          console.log(`Erro ao buscar itens do pedido ${pedido.ID_PEDIDO}:`, error);
        }
      }
      
      // Top 5 produtos mais vendidos
      const produtosMaisVendidos = Object.entries(produtosCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([nome, quantidade]) => ({
          nome,
          quantidade,
          faturamento: faturamentoPorProduto[nome] || 0
        }));
      
      // Faturamento dos últimos 7 dias
      const hoje = new Date();
      const faturamentoPorDia = [];
      
      for (let i = 6; i >= 0; i--) {
        const data = new Date(hoje);
        data.setDate(hoje.getDate() - i);
        const dataStr = data.toISOString().split('T')[0];
        
        const pedidosDoDia = todosPedidos.filter(pedido => {
          const dataPedido = new Date(pedido.DT_PEDIDO).toISOString().split('T')[0];
          return dataPedido === dataStr;
        });
        
        const faturamentoDia = pedidosDoDia.reduce((total, pedido) => total + (pedido.VL_TOTAL || 0), 0);
        
        faturamentoPorDia.push({
          data: data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
          faturamento: faturamentoDia,
          pedidos: pedidosDoDia.length
        });
      }
      
      setEstatisticas({
        totalPedidos,
        faturamentoTotal,
        pedidosPendentes,
        pedidosEmProducao,
        pedidosFinalizados,
        produtosMaisVendidos,
        faturamentoPorDia
      });
      
    } catch (error) {
      console.log("loadEstatisticas error:", error);
      Alert.alert("Erro", "Não foi possível carregar as estatísticas");
    } finally {
      setLoading(false);
    }
  }

  function getPercentualStatus(quantidade) {
    if (estatisticas.totalPedidos === 0) return 0;
    return ((quantidade / estatisticas.totalPedidos) * 100).toFixed(1);
  }

  useFocusEffect(
    React.useCallback(() => {
      loadEstatisticas();
    }, [])
  );

  return (
    <ScrollView 
      style={styles.container} 
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadEstatisticas} />
      }
    >
      <Text style={styles.title}>Dashboard Admin</Text>
      
      {/* Resumo Geral */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}> Resumo Geral</Text>
        <View style={styles.resumoContainer}>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoNumero}>{estatisticas.totalPedidos}</Text>
            <Text style={styles.resumoTexto}>Total de Pedidos</Text>
          </View>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoNumero}>
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(estatisticas.faturamentoTotal)}
            </Text>
            <Text style={styles.resumoTexto}>Faturamento Total</Text>
          </View>
        </View>
      </View>

      {/* Status dos Pedidos */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}> Status dos Pedidos</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusItem, { backgroundColor: '#757575' }]}>
            <Text style={styles.statusNumero}>{estatisticas.pedidosPendentes}</Text>
            <Text style={styles.statusTexto}>Pendentes</Text>
            <Text style={styles.statusPercent}>{getPercentualStatus(estatisticas.pedidosPendentes)}%</Text>
          </View>
          
          <View style={[styles.statusItem, { backgroundColor: '#ff9800' }]}>
            <Text style={styles.statusNumero}>{estatisticas.pedidosEmProducao}</Text>
            <Text style={styles.statusTexto}>Em Produção</Text>
            <Text style={styles.statusPercent}>{getPercentualStatus(estatisticas.pedidosEmProducao)}%</Text>
          </View>
          
          <View style={[styles.statusItem, { backgroundColor: '#4caf50' }]}>
            <Text style={styles.statusNumero}>{estatisticas.pedidosFinalizados}</Text>
            <Text style={styles.statusTexto}>Finalizados</Text>
            <Text style={styles.statusPercent}>{getPercentualStatus(estatisticas.pedidosFinalizados)}%</Text>
          </View>
        </View>
      </View>

      {/* Produtos Mais Vendidos */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}> Top 5 Produtos Mais Vendidos</Text>
        {estatisticas.produtosMaisVendidos.length > 0 ? (
          estatisticas.produtosMaisVendidos.map((produto, index) => (
            <View key={index} style={styles.produtoItem}>
              <View style={styles.produtoRank}>
                <Text style={styles.produtoRankTexto}>{index + 1}º</Text>
              </View>
              <View style={styles.produtoInfo}>
                <Text style={styles.produtoNome}>{produto.nome}</Text>
                <Text style={styles.produtoDetalhes}>
                  {produto.quantidade} vendidos • {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(produto.faturamento)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.semDados}>Nenhum produto vendido ainda</Text>
        )}
      </View>

      {/* Faturamento dos Últimos 7 Dias */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}> Faturamento Últimos 7 Dias</Text>
        {estatisticas.faturamentoPorDia.map((dia, index) => (
          <View key={index} style={styles.faturamentoDia}>
            <Text style={styles.faturamentoDiaTexto}>{dia.data}</Text>
            <View style={styles.faturamentoDiaInfo}>
              <Text style={styles.faturamentoDiaValor}>
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(dia.faturamento)}
              </Text>
              <Text style={styles.faturamentoDiaPedidos}>{dia.pedidos} pedidos</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Média por Pedido */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}> Métricas</Text>
        <View style={styles.metricasContainer}>
          <View style={styles.metricaItem}>
            <Text style={styles.metricaValor}>
              {estatisticas.totalPedidos > 0 
                ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(estatisticas.faturamentoTotal / estatisticas.totalPedidos)
                : "R$ 0,00"
              }
            </Text>
            <Text style={styles.metricaTexto}>Ticket Médio</Text>
          </View>
          
          <View style={styles.metricaItem}>
            <Text style={styles.metricaValor}>
              {(estatisticas.faturamentoPorDia.reduce((total, dia) => total + dia.pedidos, 0) / 7).toFixed(1)}
            </Text>
            <Text style={styles.metricaTexto}>Pedidos/Dia (média)</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}