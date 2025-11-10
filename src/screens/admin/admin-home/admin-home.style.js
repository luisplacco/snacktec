import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../../constants/theme.js";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: COLORS.white,
    justifyContent: "center"
  },
  title: { 
    fontSize: FONT_SIZE.xl, 
    fontWeight: "bold", 
    marginBottom: 8,
    textAlign: "center",
    color: COLORS.red
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.medium_gray,
    textAlign: "center",
    marginBottom: 40
  },
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: COLORS.red,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { 
    fontSize: FONT_SIZE.lg, 
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 5
  },
  cardSubtitle: { 
    color: COLORS.white, 
    fontSize: FONT_SIZE.sm,
    opacity: 0.9
  },
  logoutCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: COLORS.medium_gray,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutTitle: {
    fontSize: FONT_SIZE.lg, 
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 5
  },
  logoutSubtitle: {
    color: COLORS.white, 
    fontSize: FONT_SIZE.sm,
    opacity: 0.9
  }
});