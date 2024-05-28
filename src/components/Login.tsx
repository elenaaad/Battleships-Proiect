import React, { useState } from "react";
import styled from "styled-components/native";
import { Text, TouchableOpacity, ToastAndroid } from "react-native";

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 60px;
  border: 1px solid;
  margin-bottom: 10px;
  padding: 10px;
`;

const Button = styled.TouchableOpacity`
  width: 30%;
  height: 60px;
  background-color: purple;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 15px;
`;


const ButtonText = styled.Text`
  color: white;
`;

const RegisterText = styled.Text`
  margin-top: 10px;
  text-align: center;
`;

const RegisterLink = styled.Text`
  color: purple;
  padding-top: 10px;
  text-decoration: underline;
`;

const ErrorMessage = styled.Text`
  color: red;
  margin-bottom: 10px;
`;

export interface ILogin {
  onSubmit: (email: string, password: string) => void;
  goToRegister: () => void;
}

const Login: React.FC<ILogin> = ({ onSubmit, goToRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = () => {
      if (!isValidEmail(email)) {
        setError("Email is invalid. Please enter a correct email!");
        return;
      }
    };
  
    const isValidEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

  return (
    <Container>
      <Input
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
      />
      <Input
        secureTextEntry
        onChangeText={setPassword}
        placeholder="Password"
      />
      {error !== "" && <ErrorMessage>{error}</ErrorMessage>}
      <Button onPress={handleSubmit}>
        <ButtonText>Submit</ButtonText>
      </Button>
      <RegisterText>
        Don't have an account?{" "}
        <TouchableOpacity onPress={goToRegister}>
          <RegisterLink>Register</RegisterLink>
        </TouchableOpacity>
      </RegisterText>
    </Container>
  );
};

export default Login;
