import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../../constants/theme.js";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: COLORS.white 
  },
  title: { 
    fontSize: FONT_SIZE.xl, 
    fontWeight: "bold", 
    marginBottom: 20,
    color: COLORS.red,
    textAlign: "center"
  },
  
  // Resumo
  resumoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resumoItem: {
    alignItems: "center"
  },
  resumoNumero: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "bold",
    color: COLORS.red,
    marginBottom: 4
  },
  resumoTexto: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.medium_gray,
    fontWeight: "500"
  },

  // Filtros
  filtrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 8
  },
  filtro: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center"
  },
  filtroAtivo: {
    backgroundColor: COLORS.red
  },
  filtroTexto: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.medium_gray,
    fontWeight: "500"
  },
  filtroTextoAtivo: {
    color: COLORS.white,
    fontWeight: "bold"
  },

  // Pedidos
  pedido: { 
    padding: 16, 
    borderRadius: 12, 
    backgroundColor: COLORS.white,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.red
  },
  pedidoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 4
  },
  expandIcon: {
    fontSize: FONT_SIZE.md,
    color: COLORS.medium_gray,
    marginLeft: 8
  },
  pedidoTitle: { 
    fontWeight: "bold", 
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark_gray,
    flex: 1
  },
  status: {
    fontWeight: "bold",
    fontSize: FONT_SIZE.sm
  },
  pedidoInfo: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.medium_gray,
    marginBottom: 4
  },

  // Itens
  itensContainer: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    borderLeft: 3,
    borderLeftColor: COLORS.red
  },
  itensTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.dark_gray,
    marginBottom: 8
  },
  itemPedido: {
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
    borderLeft: 2,
    borderLeftColor: "#ff9800"
  },
  itemNome: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "bold",
    color: COLORS.dark_gray,
    marginBottom: 4
  },
  itemDetalhes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemQtd: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.medium_gray,
    fontWeight: "bold"
  },
  itemPreco: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.red,
    fontWeight: "bold"
  },
  itemObs: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.medium_gray,
    fontStyle: "italic",
    marginTop: 4
  },
  semItens: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.medium_gray,
    fontStyle: "italic",
    textAlign: "center"
  },

  // Empty state
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50
  },
  emptyText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.medium_gray,
    fontWeight: "bold",
    marginBottom: 8
  },
  emptySubtext: {
    fontSize: FONT_SIZE.md,
    color: COLORS.medium_gray,
    textAlign: "center"
  }
});