import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  order: { flexDirection: "row", padding: 12, borderRadius: 8, backgroundColor: "#f9f9f9", marginBottom: 10 },
  orderTitle: { fontWeight: "700", marginBottom: 6 },
  actions: { justifyContent: "space-between" },
  btn: { backgroundColor: "#f39c12", padding: 8, borderRadius: 6, marginBottom: 6 },
  btnText: { color: "#fff", fontWeight: "600" },
});