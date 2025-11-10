import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../../constants/api.js";
import { styles } from "./admin-historico.style.js";

export default function AdminHistorico() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedPedidos, setExpandedPedidos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('todos'); // todos, pendente, producao, finalizado

  async function loadPedidos() {
    setLoading(true);
    try {
      const resp = await api.get("/admin/pedidos");
      let pedidosFiltrados = resp.data || [];
      
      // Aplicar filtro de status
      if (filtroStatus !== 'todos') {
        const statusMap = {
          'pendente': null,
          'producao': 'P', 
          'finalizado': 'F'
        };
        pedidosFiltrados = pedidosFiltrados.filter(pedido => pedido.STATUS === statusMap[filtroStatus]);
      }
      
      // Carregar itens de cada pedido
      const pedidosComItens = await Promise.all(
        pedidosFiltrados.map(async (pedido) => {
          try {
            const itensResp = await api.get(`/admin/pedidos/${pedido.ID_PEDIDO}/itens`);
            return {
              ...pedido,
              itens: itensResp.data || []
            };
          } catch (error) {
            console.log(`Erro ao carregar itens do pedido ${pedido.ID_PEDIDO}:`, error);
            return {
              ...pedido,
              itens: []
            };
          }
        })
      );
      
      // Ordenar por data (mais recente primeiro)
      pedidosComItens.sort((a, b) => new Date(b.DT_PEDIDO) - new Date(a.DT_PEDIDO));
      
      setPedidos(pedidosComItens);
    } catch (error) {
      console.log("loadPedidos error:", error);
      Alert.alert("Erro", "Não foi possível carregar o histórico");
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status) {
    switch(status) {
      case 'P': return '#ff9800'; // Laranja para em produção
      case 'F': return '#4caf50'; // Verde para finalizado
      default: return '#757575'; // Cinza para pendente
    }
  }

  function getStatusText(status) {
    switch(status) {
      case 'P': return 'Em produção';
      case 'F': return 'Finalizado';
      default: return 'Pendente';
    }
  }

  function toggleExpandPedido(idPedido) {
    setExpandedPedidos(prev => 
      prev.includes(idPedido) 
        ? prev.filter(id => id !== idPedido)
        : [...prev, idPedido]
    );
  }

  function getTotalPedidos() {
    return pedidos.length;
  }

  function getTotalFaturamento() {
    return pedidos.reduce((total, pedido) => total + (pedido.VL_TOTAL || 0), 0);
  }

  useFocusEffect(
    React.useCallback(() => {
      loadPedidos();
    }, [filtroStatus])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Pedidos</Text>
      
      {/* Resumo */}
      <View style={styles.resumoContainer}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoNumero}>{getTotalPedidos()}</Text>
          <Text style={styles.resumoTexto}>Pedidos</Text>
        </View>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoNumero}>
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(getTotalFaturamento())}
          </Text>
          <Text style={styles.resumoTexto}>Faturamento</Text>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filtrosContainer}>
        <TouchableOpacity 
          style={[styles.filtro, filtroStatus === 'todos' && styles.filtroAtivo]}
          onPress={() => setFiltroStatus('todos')}
        >
          <Text style={[styles.filtroTexto, filtroStatus === 'todos' && styles.filtroTextoAtivo]}>
            Todos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filtro, filtroStatus === 'pendente' && styles.filtroAtivo]}
          onPress={() => setFiltroStatus('pendente')}
        >
          <Text style={[styles.filtroTexto, filtroStatus === 'pendente' && styles.filtroTextoAtivo]}>
            Pendentes
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filtro, filtroStatus === 'producao' && styles.filtroAtivo]}
          onPress={() => setFiltroStatus('producao')}
        >
          <Text style={[styles.filtroTexto, filtroStatus === 'producao' && styles.filtroTextoAtivo]}>
            Em Produção
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filtro, filtroStatus === 'finalizado' && styles.filtroAtivo]}
          onPress={() => setFiltroStatus('finalizado')}
        >
          <Text style={[styles.filtroTexto, filtroStatus === 'finalizado' && styles.filtroTextoAtivo]}>
            Finalizados
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de pedidos */}
      <FlatList
        data={pedidos}
        keyExtractor={(pedido) => pedido.ID_PEDIDO.toString()}
        refreshing={loading}
        onRefresh={loadPedidos}
        renderItem={({ item }) => {
          const isExpanded = expandedPedidos.includes(item.ID_PEDIDO);
          return (
            <View style={styles.pedido}>
              <TouchableOpacity 
                style={styles.pedidoHeader}
                onPress={() => toggleExpandPedido(item.ID_PEDIDO)}
              >
                <Text style={styles.pedidoTitle}>
                  Pedido #{item.ID_PEDIDO} {item.RA_USUARIO ? `- ***${item.RA_USUARIO.toString().slice(-3)}` : ''}
                </Text>
                <Text style={[styles.status, { color: getStatusColor(item.STATUS) }]}>
                  {getStatusText(item.STATUS)}
                </Text>
                <Text style={styles.expandIcon}>
                  {isExpanded ? '▼' : '▶'}
                </Text>
              </TouchableOpacity>
              
              <Text style={styles.pedidoInfo}>
                Cliente: {item.NOME_USUARIO || 'Cliente'} {item.RA_USUARIO ? `(***${item.RA_USUARIO.toString().slice(-3)})` : `(ID ${item.ID_USUARIO})`}
              </Text>
              <Text style={styles.pedidoInfo}>Total: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.VL_TOTAL || 0)}</Text>
              <Text style={styles.pedidoInfo}>Data: {new Date(item.DT_PEDIDO).toLocaleString('pt-BR')}</Text>

              {isExpanded && (
                <View style={styles.itensContainer}>
                  <Text style={styles.itensTitle}>🍽️ Itens do Pedido:</Text>
                  {item.itens && item.itens.length > 0 ? (
                    item.itens.map((itemPedido, index) => (
                      <View key={index} style={styles.itemPedido}>
                        <Text style={styles.itemNome}>
                          {itemPedido.NOME_PRODUTO || 'Produto'}
                        </Text>
                        <View style={styles.itemDetalhes}>
                          <Text style={styles.itemQtd}>Qtd: {itemPedido.QTD}</Text>
                          <Text style={styles.itemPreco}>
                            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(itemPedido.VL_TOTAL)}
                          </Text>
                        </View>
                        {itemPedido.OBSERVACAO && (
                          <Text style={styles.itemObs}>📝 {itemPedido.OBSERVACAO}</Text>
                        )}
                      </View>
                    ))
                  ) : (
                    <Text style={styles.semItens}>Nenhum item encontrado</Text>
                  )}
                </View>
              )}
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
            <Text style={styles.emptySubtext}>Não há pedidos para este filtro 📊</Text>
          </View>
        )}
      />
    </View>
  );
}