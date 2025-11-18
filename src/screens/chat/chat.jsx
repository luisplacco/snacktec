import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./chat.style.js";
import api from "../../constants/api.js";
import { useFocusEffect } from "@react-navigation/native";

export default function Chat({ navigation }) {
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef();

  async function carregarMensagens() {
    try {
      const response = await api.get("/chat");
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
      console.log("Erro ao carregar mensagens:", error);
      Alert.alert("Erro", "Não foi possível carregar as mensagens");
    }
  }

  async function enviarMensagem() {
    if (!novaMensagem.trim()) {
      Alert.alert("Atenção", "Digite uma mensagem");
      return;
    }

    const mensagemParaEnviar = novaMensagem.trim();
    setNovaMensagem(""); // Limpar o campo imediatamente após clicar enviar

    try {
      setLoading(true);
      const response = await api.post("/chat", {
        mensagem: mensagemParaEnviar
      });

      if (response.data.success) {
        carregarMensagens(); // Recarregar mensagens
      } else {
        // Se falhou, restaurar a mensagem
        setNovaMensagem(mensagemParaEnviar);
      }
    } catch (error) {
      console.log("Erro ao enviar mensagem:", error);
      Alert.alert("Erro", "Não foi possível enviar a mensagem");
      // Restaurar a mensagem em caso de erro
      setNovaMensagem(mensagemParaEnviar);
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

  function renderMensagem({ item }) {
    const isAluno = item.TIPO_REMETENTE === 'aluno';
    
    return (
      <View style={[
        styles.mensagemContainer,
        isAluno ? styles.mensagemAluno : styles.mensagemAdmin
      ]}>
        <View style={[
          styles.bolhaMensagem,
          isAluno ? styles.bolhaAluno : styles.bolhaAdmin
        ]}>
          <Text style={[
            styles.textoMensagem,
            isAluno ? styles.textoAluno : styles.textoAdmin
          ]}>
            {item.MENSAGEM}
          </Text>
          <Text style={styles.horaMensagem}>
            {formatarHora(item.DATA_HORA)}
          </Text>
        </View>
      </View>
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      carregarMensagens();
      // Atualizar a cada 2 segundos
      const interval = setInterval(carregarMensagens, 2000);
      return () => clearInterval(interval);
    }, [])
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
        <Text style={styles.tituloHeader}> Suporte</Text>
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
               Olá! Como podemos ajudar?
            </Text>
            <Text style={styles.subtextoSemMensagens}>
              Envie sua dúvida que responderemos em breve
            </Text>
          </View>
        )}
      />

      {/* Input de Nova Mensagem */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputMensagem}
            placeholder="Digite sua mensagem..."
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
            onPress={enviarMensagem}
            disabled={!novaMensagem.trim() || loading}
          >
            <Text style={styles.textoBotaoEnviar}>
              {loading ? "..." : "->"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}