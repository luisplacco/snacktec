import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    containerBack: {
        position: "absolute",
        top: 30,
        left: 15,
        zIndex: 1,
    },
    back: {
        width: 40,
        height: 40,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20,
        backgroundColor: COLORS.vine,
    },
    title: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "bold",
        color: COLORS.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    item: {
        marginBottom: 25,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
    },
    label: {
        fontSize: FONT_SIZE.md,
        fontWeight: "bold",
        color: COLORS.dark_gray,
        marginBottom: 5,
    },
    value: {
        fontSize: FONT_SIZE.md,
        color: COLORS.black,
    },
};