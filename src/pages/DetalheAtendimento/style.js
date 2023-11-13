import { StyleSheet } from "react-native";

// Criação de estilos
const styles = StyleSheet.create({
  // Estilo para o contêiner principal da página
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4", // Cor de fundo geral
  },
  // Estilo para o formulário na página
  form: {
    minWidth: 350,
    maxWidth: 380,
    padding: 20,
    backgroundColor: "white", // Cor de fundo do formulário
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  // Estilo para o título da página
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#007bff", // Cor de destaque para o título
    textAlign: "center",
  },
  // Estilo para rótulos de texto
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: 16,
  },
  // Estilo para campos de entrada de texto
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  // Estilo para botões
  button: {
    backgroundColor: "#007bff", // Cor de destaque para o botão
    borderRadius: 5,
    paddingVertical: 10,
  },
  // Estilo para o texto dentro dos botões
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  // Estilo para mensagens de erro ou feedback
  mensagem: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 16,
  },
  // Estilo para links de registro ou ações semelhantes
  registroLink: {
    fontSize: 16,
    color: "#007bff", // Cor de destaque para o link
    textAlign: "center",
    marginTop: 10, // Espaçamento superior para o link
  },
  delButton: {
    position: "fixed",
    bottom: 20,
    right: 20,
    backgroundColor: "red", 
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
});

// Exporta os estilos 
export default styles;
