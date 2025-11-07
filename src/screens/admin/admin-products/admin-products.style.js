import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  addBtn: { backgroundColor: "#3498db", padding: 10, borderRadius: 8, marginBottom: 12 },
  addBtnText: { color: "#fff", fontWeight: "700" },
  product: { flexDirection: "row", padding: 12, borderRadius: 8, backgroundColor: "#f6f6f6", marginBottom: 10 },
  productTitle: { fontWeight: "700" },
  editBtn: { backgroundColor: "#f39c12", padding: 8, borderRadius: 6, justifyContent: "center" },
  modal: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" },
  modalContent: { width: "90%", backgroundColor: "#fff", padding: 16, borderRadius: 8 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, marginBottom: 8, borderRadius: 6 },
  saveBtn: { backgroundColor: "#2ecc71", padding: 10, borderRadius: 6 },
  cancelBtn: { padding: 10 },
});