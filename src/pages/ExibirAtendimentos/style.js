import { StyleSheet } from "react-native";

// Criação de estilos
const styles = StyleSheet.create({
  // Estilo para o contêiner principal da página
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Cor de fundo cinza claro
  },
  // Estilo para o cabeçalho da página
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  // Estilo para informações do usuário no cabeçalho
  userInfo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555", // Cor de texto cinza escuro
  },
  // Estilo para o título da página
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6600", // Cor laranja ousada
    marginBottom: 20,
    textAlign: "center",
  },
  // Estilo para texto quando não há conteúdo
  emptyText: {
    fontSize: 18,
    color: "#555", // Cor de texto cinza escuro
    textAlign: "center",
  },
  // Estilo para o contêiner de cada item na lista
  itemContainer: {
    minWidth: 350,
    maxWidth: 380,
    backgroundColor: "#fff", // Cor de fundo branco
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)", // Sombra mais escura
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  // Estilo para o texto do cliente no item da lista
  clienteText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff", // Cor azul ousada
  },
  // Estilo para mensagens de feedback
  mensagem: {
    fontSize: 18,
    color: "#4caf50", // Cor verde animada
    marginTop: 10,
    textAlign: "center",
  },
  // Estilo para o botão de adicionar na página
  addButton: {
    position: "fixed",
    bottom: 20,
    right: 20,
    backgroundColor: "#ff6600", // Cor laranja ousada
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)", // Sombra mais escura
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    zIndex:2
  },
  // Estilo para o contêiner de filtros
  filtroContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
});

// Exporta os estilos
export default styles;
