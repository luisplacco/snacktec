import { createContext, useState, useEffect } from "react";
import { removeUserStorage, LoadUsuario } from "../storage/storage.usuario.js";
import api from "../constants/api.js";

const AuthContext = createContext({});

function AuthProvider(props){

const [user, setUser] = useState({});
const [loading, setLoading] = useState(true);

useEffect(() => {
    async function loadStoredUser() {
        try {
            const storedUser = await LoadUsuario();
            if (storedUser && storedUser.ID_USUARIO && storedUser.token) {
                // Verificar se o token ainda é válido
                api.defaults.headers.common['Authorization'] = "Bearer " + storedUser.token;
                setUser(storedUser);
            }
        } catch (error) {
            console.log("Erro ao carregar usuário:", error);
        } finally {
            setLoading(false);
        }
    }
    
    loadStoredUser();
}, []);

async function logout() {
    try {
        // Limpar dados do usuário do AsyncStorage
        await removeUserStorage();
        // Limpar header de autorização
        delete api.defaults.headers.common['Authorization'];
        // Limpar estado do usuário
        setUser({});
    } catch (error) {
        console.log("Erro ao fazer logout:", error);
    }
}

return <AuthContext.Provider value={ { user, setUser, logout, loading } }>
    {props.children}
</AuthContext.Provider>

}


export { AuthContext, AuthProvider };