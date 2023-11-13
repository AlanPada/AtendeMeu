import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

// Componente funcional para a tela de login
const Login = () => {
  // Estados para armazenar o email, senha e mensagens de feedback
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Objeto de navegação para redirecionar o usuário para outras telas
  const navigation = useNavigation();

  // Função para lidar com o processo de login
  const handleLogin = async () => {
    try {
      // Autenticar o usuário com e-mail e senha
      await signInWithEmailAndPassword(auth, email, senha);

      // Atualizar a mensagem de feedback
      setMensagem("Login bem-sucedido!");

      // Redirecionar o usuário para a tela de exibição de atendimentos
      navigation.navigate("Exibir Atendimentos");
    } catch (error) {
      // Lidar com erros durante o processo de login
      console.error("Erro ao fazer login: ", error.message);

      // Atualizar a mensagem de feedback com o erro
      setMensagem("Erro ao fazer login: " + error.message);
    }
  };

  // Função para lidar com a navegação para a tela de registro
  const handleRegistro = () => {
    navigation.navigate("Registro de Usuario");
  };

  // Renderização do componente
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Bem-Vindo!</Text>

        {/* Input para o email */}
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        {/* Input para a senha */}
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />

        {/* Botão para realizar o login */}
        <Button title="Login" onPress={handleLogin} />

        {/* Exibir mensagem de feedback (se houver) */}
        {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

        {/* Link para a tela de registro */}
        <TouchableOpacity onPress={handleRegistro}>
          <Text style={styles.registroLink}>
            Clique aqui para se registrar!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Exportar o componente Login
export default Login;
