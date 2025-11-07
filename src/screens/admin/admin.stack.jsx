import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHome from "./admin-home/admin-home";
import AdminOrders from "./admin-order/admin-order";
import AdminProducts from "./admin-products/admin-products";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminHome" component={AdminHome} options={{ title: "Admin" }} />
      <Stack.Screen name="AdminOrders" component={AdminOrders} options={{ title: "Orders" }} />
      <Stack.Screen name="AdminProducts" component={AdminProducts} options={{ title: "Products" }} />
    </Stack.Navigator>
  );
}