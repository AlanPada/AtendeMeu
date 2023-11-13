import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Picker,
} from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth, database } from "../../config/firebase";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./style";

// Array de resoluções de atendimento disponíveis
const resolucoesAtendimento = ["Concluído", "Em Andamento", "Abandonado"];

// Componente para exibir a lista de atendimentos
const ExibirAtendimentos = ({ navigation }) => {
  // Armazenar a lista de atendimentos, filtro de resolução, informações do usuário e mensagens de feedback
  const [atendimentos, setAtendimentos] = useState([]);
  const [resolucaoFiltro, setResolucaoFiltro] = useState("");
  const auth = useAuth();
  const [mensagem, setMensagem] = useState("");

  // Para buscar/atualizar os atendimentos
  useEffect(() => {
    // Referência à coleção de atendimentos no Firebase
    const atendimentosRef = collection(database, "atendimentos");
    
    // UID do usuário autenticado
    const usuarioUID = auth.currentUser ? auth.currentUser.uid : "";

    // Constroi a consulta base
    let consulta = query(atendimentosRef, where("uidUsuario", "==", usuarioUID));

    // Adiciona a condição de filtro por resolução, se houver uma selecionada
    if (resolucaoFiltro) {
      consulta = query(
        atendimentosRef,
        where("uidUsuario", "==", usuarioUID),
        where("resolucaoAtendimento", "==", resolucaoFiltro)
      );
    }

    // Snapshot para receber as atualizações na coleção de atendimentos
    const unsubscribe = onSnapshot(consulta, (querySnapshot) => {
      // Mapeia os documentos do snapshot para o formato desejado
      const atendimentosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Atualiza o estado com os novos atendimentos
      setAtendimentos(atendimentosData);
    });

    // Função de limpeza para desinscrever o ouvinte quando o componente é desmontado
    return () => unsubscribe();
  }, [auth.currentUser, resolucaoFiltro]);

  // Função para navegar para a tela de detalhes do atendimento
  const navegarParaDetalhes = (atendimentoId) => {
    navigation.navigate("Detalhe de Atendimento", { atendimentoId });
  };

  // Função para lidar com o logout do usuário
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setMensagem("Erro ao fazer logout. Tente novamente.");
    }
  };

  // Função para navegar para a tela de cadastro de atendimentos
  const navigateToCadastrarAtendimentos = () => {
    navigation.navigate("Cadastrar Atendimento");
  };

  // Renderização do componente
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userInfo}>
          {auth.currentUser ? `Usuário: ${auth.currentUser.email}` : ""}
        </Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>

      {/* Botão para adicionar novo atendimento */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={navigateToCadastrarAtendimentos}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Lista de Atendimentos</Text>

      {/* Dropdown para selecionar a resolução */}
      <Picker
        selectedValue={resolucaoFiltro}
        onValueChange={(itemValue) => setResolucaoFiltro(itemValue)}
        style={styles.filtroContainer}
      >
        <Picker.Item label="Filtrar por Resolução" value="" />
        {resolucoesAtendimento.map((resolucao) => (
          <Picker.Item key={resolucao} label={resolucao} value={resolucao} />
        ))}
      </Picker>

      {/* Exibir mensagem se não houver atendimentos */}
      {atendimentos.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum atendimento cadastrado.</Text>
      ) : (
        // Lista de atendimentos
        <FlatList
          data={atendimentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navegarParaDetalhes(item.id)}>
              <View style={styles.itemContainer}>
                {/* Informações do atendimento */}
                <Text style={styles.clienteText}>
                  {`Cliente: ${item.nomeCliente}`}
                </Text>
                <Text style={styles.clienteText}>
                  {`Data: ${item.dataAtendimento}`}
                </Text>
                <Text style={styles.clienteText}>
                  {`Hora: ${item.horaAtendimento}`}
                </Text>
                <Text style={styles.clienteText}>
                  {`Tipo: ${item.tipoAtendimento}`}
                </Text>
                <Text style={styles.clienteText}>
                  {`Resolução: ${item.resolucaoAtendimento}`}
                </Text>
                <Text style={styles.clienteText}>
                  {`Nome do Atendente: ${item.nomeAtendente}`}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Exibir mensagem de feedback (se houver) */}
      {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
    </View>
  );
};

// Exportar o componente ExibirAtendimentos
export default ExibirAtendimentos;
