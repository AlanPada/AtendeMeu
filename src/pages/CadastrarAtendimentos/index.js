import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Picker } from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth, database } from "../../config/firebase";
import { TextInputMask } from "react-native-masked-text";
import styles from "./style";

// Dados para as listas suspensas
const estados = [
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" },
];

const tiposDeAtendimento = [
  "Informação",
  "Retorno",
  "Agendamento",
  "Encaminhamento",
  "Reclamação",
  "Sugestão",
  "Elogio",
  "Cancelamento",
  "Outro",
];

const resolucoesAtendimento = ["Concluído", "Em Andamento", "Abandonado"];

const generos = ["Masculino", "Feminino", "Não Binário", "Outro"];

// Ordena os estados em ordem alfabética
estados.sort((a, b) => a.label.localeCompare(b.label));

// Componente para cadastrar um novo atendimento
const CadastrarAtendimentos = () => {
  // Estados para armazenar os dados do atendimento
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [genero, setGenero] = useState("");
  const [dataAtendimento, setDataAtendimento] = useState("");
  const [horaAtendimento, setHoraAtendimento] = useState("");
  const [tipoAtendimento, setTipoAtendimento] = useState("");
  const [descricaoAtendimento, setdescricaoAtendimento] = useState("");
  const [resolucaoAtendimento, setResolucaoAtendimento] = useState("");
  const [nomeAtendente, setNomeAtendente] = useState("");

  // Hook de autenticação para obter informações do usuário autenticado
  const auth = useAuth();

  // Função para cadastrar um novo atendimento
  const cadastrarAtendimento = async () => {
    try {
      // Verifica se todos os campos obrigatórios foram preenchidos
      if (
        !nomeCliente ||
        !telefone ||
        !emailCliente ||
        !cidade ||
        !estado ||
        !genero ||
        !dataAtendimento ||
        !horaAtendimento ||
        !tipoAtendimento ||
        !descricaoAtendimento ||
        !resolucaoAtendimento ||
        !nomeAtendente
      ) {
        Alert.alert(
          "Erro",
          "Por favor, preencha todos os campos obrigatórios."
        );
        return;
      }

      // Referência à coleção de atendimentos no Firebase
      const atendimentoRef = collection(database, "atendimentos");

      // Adiciona um novo documento à coleção com os dados do atendimento
      await addDoc(atendimentoRef, {
        nomeCliente,
        telefone,
        emailCliente,
        cidade,
        estado,
        genero,
        dataAtendimento,
        horaAtendimento,
        tipoAtendimento,
        descricaoAtendimento,
        resolucaoAtendimento,
        nomeAtendente,
        uidUsuario: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      });

      // Limpa os campos após o cadastro
      setNomeCliente("");
      setTelefone("");
      setEmailCliente("");
      setCidade("");
      setEstado("");
      setGenero("");
      setDataAtendimento("");
      setHoraAtendimento("");
      setTipoAtendimento("");
      setdescricaoAtendimento("");
      setResolucaoAtendimento("");
      setNomeAtendente("");

      // Exibe mensagem de sucesso
      Alert.alert("Sucesso", "Atendimento cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar atendimento:", error);

      // Exibe mensagem de erro
      Alert.alert(
        "Erro",
        "Houve um erro ao cadastrar o atendimento. Por favor, tente novamente."
      );
    }
  };

  // Renderização do componente
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Cadastro de Atendimento:</Text>

        <Text style={styles.label}>Nome do Cliente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Cliente"
          value={nomeCliente}
          onChangeText={(text) => setNomeCliente(text)}
        />

        <Text style={styles.label}>Telefone:</Text>
        <TextInputMask
          style={styles.input}
          placeholder="Telefone"
          type={"cel-phone"}
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) ",
          }}
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
        />

        <Text style={styles.label}>Email do Cliente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email do Cliente"
          value={emailCliente}
          onChangeText={(text) => setEmailCliente(text)}
        />

        <Text style={styles.label}>Cidade:</Text>
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={cidade}
          onChangeText={(text) => setCidade(text)}
        />

        <Text style={styles.label}>Estado:</Text>
        <Picker
          selectedValue={estado}
          onValueChange={(itemValue) => setEstado(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Selecione o Estado" value="" />
          {estados.map((estado) => (
            <Picker.Item
              key={estado.value}
              label={estado.label}
              value={estado.value}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Gênero:</Text>
        <Picker
          selectedValue={genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Selecione o Gênero" value="" />
          {generos.map((genero) => (
            <Picker.Item key={genero} label={genero} value={genero} />
          ))}
        </Picker>

        <Text style={styles.label}>Data do Atendimento:</Text>
        <TextInputMask
          style={styles.input}
          placeholder="Data do Atendimento"
          type={"datetime"}
          options={{
            format: "DD/MM/YYYY",
          }}
          value={dataAtendimento}
          onChangeText={(text) => setDataAtendimento(text)}
        />

        <Text style={styles.label}>Hora do Atendimento:</Text>
        <TextInputMask
          style={styles.input}
          placeholder="Hora do Atendimento"
          type={"datetime"}
          options={{
            format: "HH:mm",
          }}
          value={horaAtendimento}
          onChangeText={(text) => setHoraAtendimento(text)}
        />

        <Text style={styles.label}>Tipo de Atendimento:</Text>
        <Picker
          selectedValue={tipoAtendimento}
          onValueChange={(itemValue) => setTipoAtendimento(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Selecione o Tipo de Atendimento" value="" />
          {tiposDeAtendimento.map((tipo) => (
            <Picker.Item key={tipo} label={tipo} value={tipo} />
          ))}
        </Picker>

        <Text style={styles.label}>Descrição do Atendimento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição do Atendimento"
          value={descricaoAtendimento}
          onChangeText={(text) => setdescricaoAtendimento(text)}
        />

        <Text style={styles.label}>Resolução do Atendimento:</Text>
        <Picker
          selectedValue={resolucaoAtendimento}
          onValueChange={(itemValue) => setResolucaoAtendimento(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Selecione a Resolução do Atendimento" value="" />
          {resolucoesAtendimento.map((resolucao) => (
            <Picker.Item key={resolucao} label={resolucao} value={resolucao} />
          ))}
        </Picker>

        <Text style={styles.label}>Nome do Atendente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Atendente"
          value={nomeAtendente}
          onChangeText={(text) => setNomeAtendente(text)}
        />

        <Button
          style={styles.button}
          title="Cadastrar Atendimento"
          onPress={cadastrarAtendimento}
        />
      </View>
    </View>
  );
};

export default CadastrarAtendimentos;
