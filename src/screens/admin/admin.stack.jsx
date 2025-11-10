import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHome from "./admin-home/admin-home";
import AdminOrders from "./admin-order/admin-order";
import AdminProducts from "./admin-products/admin-products";
import AdminDashboard from "./admin-dashboard/admin-dashboard";
import AdminHistorico from "./admin-historico/admin-historico";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminHome" component={AdminHome} options={{ title: "Painel Admin" }} />
      <Stack.Screen name="AdminOrders" component={AdminOrders} options={{ title: "Gerenciar Pedidos" }} />
      <Stack.Screen name="AdminProducts" component={AdminProducts} options={{ title: "Produtos" }} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: "Dashboard" }} />
      <Stack.Screen name="AdminHistorico" component={AdminHistorico} options={{ title: "Histórico" }} />
    </Stack.Navigator>
  );
}