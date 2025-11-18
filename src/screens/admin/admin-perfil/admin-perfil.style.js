import { COLORS, FONT_SIZE } from "../../../constants/theme.js";

export const styles = {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 'bold',
        color: COLORS.dark_gray,
        marginBottom: 15,
    },
    
    // Informações do Admin
    infoContainer: {
        gap: 12,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light_gray,
    },
    infoLabel: {
        fontSize: FONT_SIZE.md,
        color: COLORS.medium_gray,
        fontWeight: '500',
    },
    infoValue: {
        fontSize: FONT_SIZE.md,
        color: COLORS.dark_gray,
        fontWeight: '600',
    },
    adminBadge: {
        backgroundColor: COLORS.red,
        color: COLORS.white,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 15,
        fontSize: FONT_SIZE.sm,
    },
    
    // Menu Items
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light_gray,
    },
    menuItemText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.dark_gray,
        fontWeight: '600',
        marginBottom: 4,
    },
    menuItemSubtext: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.medium_gray,
    },
    
    // Estatísticas
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 20,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        backgroundColor: COLORS.light_gray,
        borderRadius: 10,
    },
    statNumber: {
        fontSize: 30,
        marginBottom: 8,
    },
    statLabel: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '600',
        color: COLORS.dark_gray,
        textAlign: 'center',
    },
    statSubtext: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.medium_gray,
        textAlign: 'center',
        marginTop: 4,
    },
    
    // Sobre
    aboutText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.medium_gray,
        lineHeight: 20,
        marginBottom: 10,
        textAlign: 'justify',
    },
    versionText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.medium_gray,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    
    // Botão de Logout
    logoutButton: {
        backgroundColor: COLORS.red,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    logoutButtonText: {
        color: COLORS.white,
        fontSize: FONT_SIZE.md,
        fontWeight: 'bold',
    },
    
    // Seção de Faturamento
    faturamentoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: COLORS.light_gray,
        borderRadius: 10,
        marginVertical: 10,
    },
    
    faturamentoLabel: {
        fontSize: FONT_SIZE.md,
        fontWeight: '600',
        color: COLORS.dark_gray,
    },
    
    faturamentoValue: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 'bold',
        color: COLORS.red,
    },
    
    // Botão do Histórico
    historicoButton: {
        backgroundColor: COLORS.green,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    
    historicoButtonText: {
        color: COLORS.white,
        fontSize: FONT_SIZE.md,
        fontWeight: 'bold',
    },
};