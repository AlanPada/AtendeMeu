import { StyleSheet } from "react-native";

// Definição de estilos 
const styles = StyleSheet.create({
  // Estilo para o contêiner principal da página
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Fundo cinza claro
  },
  // Estilo para o formulário na página
  form: {
    minWidth: 350,
    maxWidth: 380,
    padding: 20,
    backgroundColor: "#fff", // Fundo branco
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  // Estilo para rótulos de texto
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
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
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 10,
  },
  // Estilo para o texto dentro dos botões
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  // Estilo para o título da página
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 20,
    textAlign: "center",
  },
});

// Exporta os estilos para serem usados em cadastrarAtendimento
export default styles;
