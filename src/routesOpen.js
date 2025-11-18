import Login from "./screens/login/login.jsx";
import Registro from "./screens/registro/registro.jsx";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function RoutesOpen() {
    return <NavigationContainer>
        <Stack.Navigator>

            <Stack.Screen name="login" component={Login} options={{
                headerShown: false
            }} />

            <Stack.Screen name="registro" component={Registro} options={{
                //headerShown: false
                headerShadowVisible: false,
                title: "",
                headerBackTitle: "Voltar"
            }} />


        </Stack.Navigator>
    </NavigationContainer>
}

export default RoutesOpen;