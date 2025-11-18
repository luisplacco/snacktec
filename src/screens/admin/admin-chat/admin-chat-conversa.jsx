import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./admin-chat-conversa.style.js";
import api from "../../../constants/api.js";
import { useFocusEffect } from "@react-navigation/native";

export default function AdminChatConversa({ navigation, route }) {
  const { ID_USUARIO, NOME_USUARIO } = route.params;
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef();

  async function carregarConversa() {
    try {
      const response = await api.get(`/admin/chat/${ID_USUARIO}`);
      if (response.data) {
        setMensagens(response.data);
        // Scroll para última mensagem
        setTimeout(() => {
          if (flatListRef.current && response.data.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }, 100);
      }
    } catch (error) {
      console.log("Erro ao carregar conversa:", error);
      Alert.alert("Erro", "Não foi possível carregar a conversa");
    }
  }

  async function enviarResposta() {
    if (!novaMensagem.trim()) {
      Alert.alert("Atenção", "Digite uma mensagem");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/admin/chat", {
        id_usuario: ID_USUARIO,
        mensagem: novaMensagem.trim()
      });

      if (response.data.success) {
        setNovaMensagem("");
        carregarConversa(); // Recarregar conversa
      }
    } catch (error) {
      console.log("Erro ao enviar resposta:", error);
      Alert.alert("Erro", "Não foi possível enviar a resposta");
    } finally {
      setLoading(false);
    }
  }

  function formatarHora(dataHora) {
    const date = new Date(dataHora);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo'
    });
  }

  function formatarData(dataHora) {
    const date = new Date(dataHora);
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    // Converter todas as datas para o fuso horário do Brasil para comparação
    const dateBR = new Date(date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const hojeBR = new Date(hoje.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const ontemBR = new Date(ontem.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));

    if (dateBR.toDateString() === hojeBR.toDateString()) {
      return "Hoje";
    } else if (dateBR.toDateString() === ontemBR.toDateString()) {
      return "Ontem";
    } else {
      return date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    }
  }

  function renderMensagem({ item, index }) {
    const isAdmin = item.TIPO_REMETENTE === 'admin';
    const mensagemAnterior = index > 0 ? mensagens[index - 1] : null;
    const dataAtual = new Date(item.DATA_HORA).toDateString();
    const dataAnterior = mensagemAnterior ? new Date(mensagemAnterior.DATA_HORA).toDateString() : null;
    const mostrarData = !mensagemAnterior || dataAtual !== dataAnterior;
    
    return (
      <View>
        {mostrarData && (
          <View style={styles.separadorData}>
            <Text style={styles.textoData}>
              {formatarData(item.DATA_HORA)}
            </Text>
          </View>
        )}
        
        <View style={[
          styles.mensagemContainer,
          isAdmin ? styles.mensagemAdmin : styles.mensagemAluno
        ]}>
          <View style={[
            styles.bolhaMensagem,
            isAdmin ? styles.bolhaAdmin : styles.bolhaAluno
          ]}>
            <Text style={[
              styles.textoMensagem,
              isAdmin ? styles.textoAdmin : styles.textoAluno
            ]}>
              {item.MENSAGEM}
            </Text>
            <Text style={[
              styles.horaMensagem,
              isAdmin ? styles.horaAdmin : styles.horaAluno
            ]}>
              {formatarHora(item.DATA_HORA)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      carregarConversa();
      // Atualizar a cada 10 segundos
      const interval = setInterval(carregarConversa, 10000);
      return () => clearInterval(interval);
    }, [ID_USUARIO])
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoVoltar}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.infoUsuario}>
          <Text style={styles.nomeUsuario}>{NOME_USUARIO}</Text>
          <Text style={styles.statusOnline}>Admin respondendo</Text>
        </View>
        
        <View style={{ width: 40 }} />
      </View>

      {/* Lista de Mensagens */}
      <FlatList
        ref={flatListRef}
        data={mensagens}
        keyExtractor={(item) => item.ID_MENSAGEM.toString()}
        renderItem={renderMensagem}
        style={styles.listaMensagens}
        onContentSizeChange={() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }}
        ListEmptyComponent={() => (
          <View style={styles.semMensagens}>
            <Text style={styles.textoSemMensagens}>
              💬 Início da conversa
            </Text>
            <Text style={styles.subtextoSemMensagens}>
              Responda a dúvida do aluno
            </Text>
          </View>
        )}
      />

      {/* Input de Resposta */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputMensagem}
            placeholder="Digite sua resposta..."
            value={novaMensagem}
            onChangeText={setNovaMensagem}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.botaoEnviar,
              (!novaMensagem.trim() || loading) && styles.botaoDesabilitado
            ]}
            onPress={enviarResposta}
            disabled={!novaMensagem.trim() || loading}
          >
            <Text style={styles.textoBotaoEnviar}>
              {loading ? "..." : "📤"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}