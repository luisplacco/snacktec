import { COLORS, FONT_SIZE } from "../../constants/theme"

export const styles = {
    header: {
        width: "100%",
        alignItems: "center"
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        backgroundColor: "transparent"
    },
    titulo: {
        color: COLORS.dark_gray,
        fontSize: FONT_SIZE.md,
        textAlign: "center"
    }
}