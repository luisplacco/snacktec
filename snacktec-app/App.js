import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styled from 'styled-components/native';
import Register from './src/components/Register';
import Login from './src/components/Login';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export default function App() {
  return (
    <Container>
      <Title>Bem-vindo ao Snacktec!</Title>
      <Register />
      <Login />
      <StatusBar style="auto" />
    </Container>
  );
}