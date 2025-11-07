import { COLORS, FONT_SIZE } from "../../constants/theme"

export const styles = {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 12
    },
    headerBar: {
        height: 45,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    logo: {
        width: 140,
        height: 27
    },
    cart: {
        width: 30,
        height: 30
    },
    busca: {
        marginBottom: 10
    },
    destaques:{
        color: COLORS.dark_gray,
        fontWeight: "bold",
    },
    cartQtd: {
        backgroundColor: COLORS.red,
        color: COLORS.white,
        borderRadius: 8,
        fontSize: FONT_SIZE.xsm,
        fontWeight: "bold",
        position : "absolute",
        top: -5,
        right: 0,
        padding: 2,
    }
}