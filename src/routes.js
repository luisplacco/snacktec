import RoutesAuth from "./routesAuth.js";
import RoutesOpen from "./routesOpen.js";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth.js";
import { View, Text, ActivityIndicator } from "react-native";
import { COLORS } from "./constants/theme.js";

function Routes() {

    const { user, loading } = useContext(AuthContext);

    // Mostrar loading enquanto verifica autenticação
    if (loading) {
        return (
            <View style={{ 
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: COLORS.white 
            }}>
                <ActivityIndicator size="large" color={COLORS.red} />
                <Text style={{ 
                    marginTop: 20, 
                    fontSize: 16, 
                    color: COLORS.dark_gray 
                }}>
                    Carregando...
                </Text>
            </View>
        );
    }

    return user.ID_USUARIO && user.token ? <RoutesAuth /> : <RoutesOpen />;
}

export default Routes; 