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
  
  botaoAtualizar: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  
  textoAtualizar: {
    fontSize: 18,
    color: "white",
  },
  
  listaConversas: {
    flex: 1,
  },
  
  conversaContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  
  avatarTexto: {
    width: 50,
    height: 50,
    backgroundColor: "#e74c3c",
    borderRadius: 25,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    lineHeight: 50,
  },
  
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#ff4444",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  
  badgeTexto: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  
  conversaInfo: {
    flex: 1,
  },
  
  conversaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  
  nomeUsuario: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  
  horaUltimaMensagem: {
    fontSize: 12,
    color: "#999",
  },
  
  ultimaMensagemContainer: {
    marginTop: 2,
  },
  
  ultimaMensagemTexto: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
  },
  
  mensagemNaoLida: {
    fontWeight: "600",
    color: "#333",
  },
  
  indicadorContainer: {
    justifyContent: "center",
    marginLeft: 8,
  },
  
  setaIndicador: {
    fontSize: 20,
    color: "#ccc",
  },
  
  semConversas: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },
  
  textoSemConversas: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  
  subtextoSemConversas: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});