import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./admin-chat.style.js";
import api from "../../../constants/api.js";
import { useFocusEffect } from "@react-navigation/native";

export default function AdminChat({ navigation }) {
  const [conversas, setConversas] = useState([]);
  const [loading, setLoading] = useState(false);

  async function carregarConversas() {
    try {
      setLoading(true);
      const response = await api.get("/admin/chat");
      
      if (response.data) {
        // Agrupar mensagens por usuário
        const conversasAgrupadas = agruparPorUsuario(response.data);
        setConversas(conversasAgrupadas);
      }
    } catch (error) {
      console.log("Erro ao carregar conversas:", error);
      Alert.alert("Erro", "Não foi possível carregar as conversas");
    } finally {
      setLoading(false);
    }
  }

  function agruparPorUsuario(mensagens) {
    const grupos = {};
    
    mensagens.forEach(mensagem => {
      const userId = mensagem.ID_USUARIO;
      
      if (!grupos[userId]) {
        grupos[userId] = {
          ID_USUARIO: userId,
          NOME_USUARIO: mensagem.NOME_USUARIO || `Usuário ${userId}`,
          mensagens: [],
          ultimaMensagem: null,
          mensagensNaoLidas: 0,
          dataUltimaMensagem: null
        };
      }
      
      grupos[userId].mensagens.push(mensagem);
      
      // Última mensagem (mais recente)
      if (!grupos[userId].dataUltimaMensagem || 
          new Date(mensagem.DATA_HORA) > new Date(grupos[userId].dataUltimaMensagem)) {
        grupos[userId].ultimaMensagem = mensagem;
        grupos[userId].dataUltimaMensagem = mensagem.DATA_HORA;
      }
      
      // Contar mensagens não lidas (apenas do aluno)
      if (!mensagem.LIDA && mensagem.TIPO_REMETENTE === 'aluno') {
        grupos[userId].mensagensNaoLidas++;
      }
    });
    
    // Converter para array e ordenar por última mensagem
    return Object.values(grupos).sort((a, b) => 
      new Date(b.dataUltimaMensagem) - new Date(a.dataUltimaMensagem)
    );
  }

  function formatarHora(dataHora) {
    const date = new Date(dataHora);
    const agora = new Date();
    const diferenca = agora - date;
    const horas = diferenca / (1000 * 60 * 60);
    
    if (horas < 24) {
      return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
      });
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        timeZone: 'America/Sao_Paulo'
      });
    }
  }

  function abrirConversa(conversa) {
    navigation.navigate("admin-chat-conversa", {
      ID_USUARIO: conversa.ID_USUARIO,
      NOME_USUARIO: conversa.NOME_USUARIO
    });
  }

  function renderConversa({ item }) {
    return (
      <TouchableOpacity
        style={styles.conversaContainer}
        onPress={() => abrirConversa(item)}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarTexto}>
            {item.NOME_USUARIO.charAt(0).toUpperCase()}
          </Text>
          {item.mensagensNaoLidas > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeTexto}>
                {item.mensagensNaoLidas > 9 ? '9+' : item.mensagensNaoLidas}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.conversaInfo}>
          <View style={styles.conversaHeader}>
            <Text style={styles.nomeUsuario}>{item.NOME_USUARIO}</Text>
            <Text style={styles.horaUltimaMensagem}>
              {formatarHora(item.dataUltimaMensagem)}
            </Text>
          </View>
          
          <View style={styles.ultimaMensagemContainer}>
            <Text 
              style={[
                styles.ultimaMensagemTexto,
                item.mensagensNaoLidas > 0 && styles.mensagemNaoLida
              ]}
              numberOfLines={2}
            >
              {item.ultimaMensagem.TIPO_REMETENTE === 'admin' ? '✓ ' : ''}
              {item.ultimaMensagem.MENSAGEM}
            </Text>
          </View>
        </View>
        
        <View style={styles.indicadorContainer}>
          <Text style={styles.setaIndicador}>›</Text>
        </View>
      </TouchableOpacity>
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      carregarConversas();
      // Atualizar a cada 15 segundos
      const interval = setInterval(carregarConversas, 15000);
      return () => clearInterval(interval);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoVoltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.tituloHeader}>💬 Conversas</Text>
        <TouchableOpacity 
          style={styles.botaoAtualizar}
          onPress={carregarConversas}
        >
          <Text style={styles.textoAtualizar}>🔄</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={conversas}
        keyExtractor={(item) => item.ID_USUARIO.toString()}
        renderItem={renderConversa}
        refreshing={loading}
        onRefresh={carregarConversas}
        style={styles.listaConversas}
        ListEmptyComponent={() => (
          <View style={styles.semConversas}>
            <Text style={styles.textoSemConversas}>
              📭 Nenhuma conversa ainda
            </Text>
            <Text style={styles.subtextoSemConversas}>
              As conversas dos alunos aparecerão aqui
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}