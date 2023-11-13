import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Picker,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { database } from "../../config/firebase";
import { TextInputMask } from "react-native-masked-text";
import { FontAwesome } from "@expo/vector-icons";
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

// Componente para exibir detalhes e editar um atendimento
const DetalheAtendimento = ({ route }) => {
  // Extrai o ID do atendimento da propriedade de navegação
  const { atendimentoId } = route.params;

  // Estados para armazenar os dados do atendimento, mensagens de feedback e navegação
  const [dadosAtendimento, setDadosAtendimento] = useState({
    nomeCliente: "",
    telefone: "",
    emailCliente: "",
    cidade: "",
    estado: "",
    genero: "",
    dataAtendimento: "",
    horaAtendimento: "",
    tipoAtendimento: "",
    descricaoAtendimento: "",
    resolucaoAtendimento: "",
    nomeAtendente: "",
  });
  const [mensagem, setMensagem] = useState("");
  const navigation = useNavigation();

  // Efeito para buscar os detalhes do atendimento ao montar o componente
  useEffect(() => {
    const obterDetalhesAtendimento = async () => {
      try {
        // Referência ao documento do atendimento no Firebase
        const atendimentoRef = doc(database, "atendimentos", atendimentoId);

        // Obtém o snapshot do documento
        const atendimentoSnapshot = await getDoc(atendimentoRef);

        if (atendimentoSnapshot.exists()) {
          // Atualiza o estado com os dados do atendimento
          const dadosAtendimento = atendimentoSnapshot.data();
          setDadosAtendimento(dadosAtendimento);
        } else {
          setMensagem("Atendimento não encontrado.");
          // Navegar de volta para a lista de atendimentos se o atendimento não for encontrado
          navigation.goBack();
        }
      } catch (error) {
        console.error("Erro ao obter detalhes do atendimento:", error);
        setMensagem(
          "Houve um erro ao obter os detalhes do atendimento. Por favor, tente novamente."
        );
        // Navegar de volta para a lista de atendimentos em caso de erro
        navigation.goBack();
      }
    };

    // Chama a função para obter os detalhes do atendimento ao montar o componente
    obterDetalhesAtendimento();
  }, [atendimentoId, navigation]);

  // Função para editar os detalhes do atendimento
  const editarAtendimento = async () => {
    try {
      // Referência ao documento do atendimento no Firebase
      const atendimentoRef = doc(database, "atendimentos", atendimentoId);

      // Atualiza o documento com os novos dados do atendimento
      await updateDoc(atendimentoRef, dadosAtendimento);

      setMensagem("Detalhes do atendimento atualizados com sucesso!");
      // Navegar de volta para a lista de atendimentos após a edição
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao editar atendimento:", error);
      setMensagem(
        "Houve um erro ao editar o atendimento. Por favor, tente novamente."
      );
    }
  };

  const excluirAtendimento = async () => {
    try {
      const shouldDelete = window.confirm("Tem certeza que deseja excluir o atendimento?");
      if (shouldDelete) {
        const atendimentoRef = doc(database, "atendimentos", atendimentoId);
        await deleteDoc(atendimentoRef);
        setMensagem("Atendimento excluído com sucesso!");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Erro ao excluir atendimento:", error);
      setMensagem(
        "Houve um erro ao excluir o atendimento. Por favor, tente novamente."
      );
    }
  };

  // Renderização do componente
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.delButton} onPress={excluirAtendimento}>
        <FontAwesome name="trash" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.title}>Detalhes do Atendimento:</Text>

        <Text style={styles.label}>Nome do Cliente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Cliente"
          value={dadosAtendimento.nomeCliente}
          onChangeText={(text) =>
            setDadosAtendimento({ ...dadosAtendimento, nomeCliente: text })
          }
        />
        <Text style={styles.label}>Telefone do Cliente:</Text>
        <TextInputMask
          style={styles.input}
          placeholder="Telefone"
          type={"cel-phone"}
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) ",
          }}
          value={dadosAtendimento.telefone}
          onChangeText={(text) =>
            setDadosAtendimento({ ...dadosAtendimento, telefone: text })
          }
        />

        <Text style={styles.label}>Email do Cliente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email do Cliente"
          value={dadosAtendimento.emailCliente}
          onChangeText={(text) =>
            setDadosAtendimento({ ...dadosAtendimento, emailCliente: text })
          }
        />

        <Text style={styles.label}>Cidade do Cliente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={dadosAtendimento.cidade}
          onChangeText={(text) =>
            setDadosAtendimento({ ...dadosAtendimento, cidade: text })
          }
        />

        <Text style={styles.label}>Estado do Cliente:</Text>
        <Picker
          selectedValue={dadosAtendimento.estado}
          onValueChange={(itemValue) =>
            setDadosAtendimento({ ...dadosAtendimento, estado: itemValue })
          }
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

        <Text style={styles.label}>Gênero do Cliente:</Text>
        <Picker
          selectedValue={dadosAtendimento.genero}
          onValueChange={(itemValue) =>
            setDadosAtendimento({ ...dadosAtendimento, genero: itemValue })
          }
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
          value={dadosAtendimento.dataAtendimento}
          onChangeText={(text) =>
            setDadosAtendimento({ ...dadosAtendimento, dataAtendimento: text })
          }
        />

        <Text style={styles.label}>Hora do Atendimento:</Text>
        <TextInputMask
          style={styles.input}
          placeholder="Hora do Atendimento"
          type={"datetime"}
          options={{
            format: "HH:mm",
          }}
          value={dadosAtendimento.horaAtendimento}
          onChangeText={(text) =>
            setDadosAtendimento({ ...dadosAtendimento, horaAtendimento: text })
          }
        />

        <Text style={styles.label}>Tipo de Atendimento:</Text>
        <Picker
          selectedValue={dadosAtendimento.tipoAtendimento}
          onValueChange={(itemValue) =>
            setDadosAtendimento({
              ...dadosAtendimento,
              tipoAtendimento: itemValue,
            })
          }
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
          value={dadosAtendimento.descricaoAtendimento}
          onChangeText={(text) =>
            setDadosAtendimento({
              ...dadosAtendimento,
              descricaoAtendimento: text,
            })
          }
        />

        <Text style={styles.label}>Resolução do Atendimento:</Text>
        <Picker
          selectedValue={dadosAtendimento.resolucaoAtendimento}
          onValueChange={(itemValue) =>
            setDadosAtendimento({
              ...dadosAtendimento,
              resolucaoAtendimento: itemValue,
            })
          }
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
          value={dadosAtendimento.nomeAtendente}
          onChangeText={(text) =>
            setDadosAtendimento({ ...dadosAtendimento, nomeAtendente: text })
          }
        />

        <Button
          style={styles.button}
          title="Editar Atendimento"
          onPress={editarAtendimento}
        />

        {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
      </View>
    </View>
  );
};

export default DetalheAtendimento;
