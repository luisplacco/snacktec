import AsyncStorage from "@react-native-async-storage/async-storage";

async function SaveUsuario (usuario){
    try {
        await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (error) {
        console.log("erro ao salvar storage");
    }
}

async function LoadUsuario (){
    try {
        const storage = await AsyncStorage.getItem("usuario");
        return storage ? JSON.parse(storage) : {};
    } catch (error) {
        console.log("erro ao carregar storage");
    }
}



export {SaveUsuario, LoadUsuario};