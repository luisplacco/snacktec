import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backIcon: {
    width: 24,
    height: 24
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333"
  },

  // Imagem
  imageContainer: {
    position: "relative",
    height: 250,
    backgroundColor: "#f8f9fa"
  },
  comboImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  promocaoTag: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  promocaoText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold"
  },

  // Informações
  infoContainer: {
    padding: 20
  },
  comboTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8
  },
  comboDescricao: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 20,
    lineHeight: 22
  },

  // Preços
  precoContainer: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center"
  },
  precoOriginal: {
    fontSize: 16,
    color: "#666666",
    textDecorationLine: "line-through",
    marginBottom: 4
  },
  precoPromocionalContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8
  },
  precoPor: {
    fontSize: 16,
    color: "#333333",
    marginRight: 8
  },
  precoPromocional: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6b6b"
  },
  economia: {
    fontSize: 16,
    color: "#4caf50",
    fontWeight: "bold"
  },

  // Itens Inclusos
  itensContainer: {
    marginBottom: 20
  },
  itensTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12
  },
  itemInclusoContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  itemQuantidade: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff6b6b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  itemQuantidadeText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  },
  itemInfo: {
    flex: 1
  },
  itemNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 2
  },
  itemDescricao: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 2
  },
  itemPrecoIndividual: {
    fontSize: 14,
    color: "#ff6b6b",
    fontWeight: "500"
  },

  // Benefícios
  beneficiosContainer: {
    backgroundColor: "#e8f5e8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  beneficiosTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12
  },
  beneficioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  beneficioIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24
  },
  beneficioTexto: {
    fontSize: 16,
    color: "#333333",
    flex: 1
  },

  // Botão
  bottomContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adicionarButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center"
  },
  adicionarButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold"
  }
});