import RoutesAuth from "./routesAuth.js";
import RoutesOpen from "./routesOpen.js";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/auth.js";
import { useNavigation } from "@react-navigation/native";

function Routes() {

    const { user } = useContext(AuthContext);

    return user.ID_USUARIO ? <RoutesAuth /> : <RoutesOpen />;
}

export default Routes; 