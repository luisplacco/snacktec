import RoutesAuth from "./routesAuth.js";
import RoutesOpen from "./routesOpen.js";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth.js";

function Routes() {

    const { user } = useContext(AuthContext);



    return user.ID_USUARIO  ? <RoutesAuth /> : <RoutesOpen />;
}

export default Routes; 