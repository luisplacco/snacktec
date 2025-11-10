import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../../constants/theme.js";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f5f5f5",
    padding: 16
  },
  title: { 
    fontSize: FONT_SIZE.xl, 
    fontWeight: "bold", 
    marginBottom: 20,
    color: COLORS.red,
    textAlign: "center"
  },

  // Cards
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.dark_gray,
    marginBottom: 12
  },

  // Resumo Geral
  resumoContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
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
    fontWeight: "500",
    textAlign: "center"
  },

  // Status
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8
  },
  statusItem: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  statusNumero: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 4
  },
  statusTexto: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.white,
    fontWeight: "500",
    marginBottom: 2
  },
  statusPercent: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.white,
    fontWeight: "bold"
  },

  // Produtos Mais Vendidos
  produtoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  produtoRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.red,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  produtoRankTexto: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "bold",
    color: COLORS.white
  },
  produtoInfo: {
    flex: 1
  },
  produtoNome: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.dark_gray,
    marginBottom: 2
  },
  produtoDetalhes: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.medium_gray
  },

  // Faturamento por Dia
  faturamentoDia: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  faturamentoDiaTexto: {
    fontSize: FONT_SIZE.md,
    color: COLORS.dark_gray,
    fontWeight: "500"
  },
  faturamentoDiaInfo: {
    alignItems: "flex-end"
  },
  faturamentoDiaValor: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.red
  },
  faturamentoDiaPedidos: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.medium_gray
  },

  // Métricas
  metricasContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  metricaItem: {
    alignItems: "center"
  },
  metricaValor: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.red,
    marginBottom: 4
  },
  metricaTexto: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.medium_gray,
    fontWeight: "500",
    textAlign: "center"
  },

  // Sem dados
  semDados: {
    fontSize: FONT_SIZE.md,
    color: COLORS.medium_gray,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 16
  }
});