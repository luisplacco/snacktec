import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e74c3c",
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  botaoVoltar: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  
  textoVoltar: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  
  tituloHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  
  listaMensagens: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  
  mensagemContainer: {
    marginVertical: 4,
  },
  
  mensagemAluno: {
    alignItems: "flex-end",
  },
  
  mensagemAdmin: {
    alignItems: "flex-start",
  },
  
  bolhaMensagem: {
    maxWidth: "80%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  bolhaAluno: {
    backgroundColor: "#e74c3c",
    borderBottomRightRadius: 4,
  },
  
  bolhaAdmin: {
    backgroundColor: "white",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  
  textoMensagem: {
    fontSize: 16,
    lineHeight: 20,
  },
  
  textoAluno: {
    color: "white",
  },
  
  textoAdmin: {
    color: "#333",
  },
  
  horaMensagem: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
    color: "white",
  },
  
  semMensagens: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  
  textoSemMensagens: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  
  subtextoSemMensagens: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  
  inputContainer: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 4,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  
  inputMensagem: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  
  botaoEnviar: {
    width: 44,
    height: 44,
    backgroundColor: "#e74c3c",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  
  botaoDesabilitado: {
    backgroundColor: "#ccc",
  },
  
  textoBotaoEnviar: {
    fontSize: 18,
    color: "white",
  },
});