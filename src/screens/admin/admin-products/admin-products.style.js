import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../../constants/theme.js";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.white 
  },
  
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  
  addBtn: { 
    backgroundColor: COLORS.red, 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  addBtnText: { 
    color: COLORS.white, 
    fontWeight: "bold",
    fontSize: FONT_SIZE.md,
  },
  
  productCard: { 
    backgroundColor: COLORS.white,
    borderRadius: 10, 
    padding: 15, 
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  productInfo: {
    marginBottom: 15,
  },
  
  productName: { 
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.dark_gray,
    marginBottom: 5,
  },
  
  productPrice: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.red,
    marginBottom: 8,
  },
  
  productDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.medium_gray,
    marginBottom: 5,
    lineHeight: 18,
  },
  
  productCategory: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.medium_gray,
    fontStyle: 'italic',
  },
  
  productActions: {
    flexDirection: 'row',
    gap: 10,
  },
  
  editBtn: { 
    backgroundColor: COLORS.green, 
    padding: 12, 
    borderRadius: 8, 
    flex: 1,
    alignItems: 'center',
  },
  
  editBtnText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: FONT_SIZE.sm,
  },
  
  deleteBtn: { 
    backgroundColor: COLORS.red, 
    padding: 12, 
    borderRadius: 8, 
    flex: 1,
    alignItems: 'center',
  },
  
  deleteBtnText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: FONT_SIZE.sm,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  
  emptyText: {
    fontSize: 60,
    marginBottom: 20,
  },
  
  emptyTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.dark_gray,
    marginBottom: 10,
  },
  
  emptySubtext: {
    fontSize: FONT_SIZE.md,
    color: COLORS.medium_gray,
    textAlign: 'center',
  },
  
  modal: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(0,0,0,0.5)" 
  },
  
  modalContent: { 
    width: "90%", 
    backgroundColor: COLORS.white, 
    padding: 20, 
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  
  modalTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.dark_gray,
    marginBottom: 20,
    textAlign: 'center',
  },
  
  input: { 
    borderWidth: 1, 
    borderColor: COLORS.light_gray, 
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 8,
    fontSize: FONT_SIZE.md,
    backgroundColor: COLORS.white,
  },
  
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  
  saveBtn: { 
    backgroundColor: COLORS.red, 
    padding: 15, 
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  
  saveBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: FONT_SIZE.md,
  },
  
  cancelBtn: { 
    backgroundColor: COLORS.light_gray, 
    padding: 15, 
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  
  cancelBtnText: {
    color: COLORS.dark_gray,
    fontWeight: "600",
    fontSize: FONT_SIZE.md,
  },
  
  categoriaContainer: {
    marginBottom: 15,
  },
  
  categoriaLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.dark_gray,
    marginBottom: 10,
  },
  
  categoriaButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  
  categoriaBtn: {
    flex: 1,
    minWidth: 100,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.light_gray,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  
  categoriaBtnSelected: {
    borderColor: COLORS.red,
    backgroundColor: COLORS.red,
  },
  
  categoriaBtnText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.dark_gray,
  },
  
  categoriaBtnTextSelected: {
    color: COLORS.white,
  },
});