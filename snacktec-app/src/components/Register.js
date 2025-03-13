import React, { useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';

const Container = styled.View`
  margin: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  width: 200px;
`;

const Button = styled.Button``;

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('aluno');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        nome,
        email,
        senha,
        tipo,
      });
      console.log('Usuário registrado:', response.data);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  return (
    <Container>
      <Label>Nome</Label>
      <Input value={nome} onChangeText={setNome} />
      <Label>Email</Label>
      <Input value={email} onChangeText={setEmail} />
      <Label>Senha</Label>
      <Input value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Registrar" onPress={handleRegister} />
    </Container>
  );
}