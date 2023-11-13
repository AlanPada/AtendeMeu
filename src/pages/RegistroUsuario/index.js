import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

// Componente funcional para a tela de registro de usuário
const RegistroUsuario = () => {
  // Estados para armazenar o email, senha e mensagens de feedback
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Objeto de navegação para redirecionar o usuário para outras telas
  const navigation = useNavigation();

  // Função para redirecionar o usuário para a tela de login
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // Função para lidar com o processo de registro de usuário
  const handleRegistro = async () => {
    try {
      // Obter a instância de autenticação
      const auth = getAuth();

      // Criar um novo usuário com e-mail e senha
      await createUserWithEmailAndPassword(auth, email, senha);

      // Atualizar a mensagem de feedback
      setMensagem("Registro bem-sucedido!");

      // Redirecionar o usuário para a tela de login
      navigation.navigate("Login");
    } catch (error) {
      // Lidar com erros durante o processo de registro
      console.error("Erro ao registrar: ", error.message);

      // Atualizar a mensagem de feedback com o erro
      setMensagem("Erro ao registrar: " + error.message);
    }
  };

  // Renderização do componente
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Registre-se</Text>

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

        {/* Botão para realizar o registro */}
        <Button title="Registrar" onPress={handleRegistro} />

        {/* Exibir mensagem de feedback (se houver) */}
        {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

        {/* Link para a tela de login */}
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.registroLink}>Clique aqui para Login!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Exportar o componente RegistroUsuario
export default RegistroUsuario;
