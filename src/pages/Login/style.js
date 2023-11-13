import { StyleSheet } from 'react-native';

// Criação de estilos 
const styles = StyleSheet.create({
  // Estilo para o contêiner principal da página
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Cor de fundo cinza claro
  },
  // Estilo para o formulário na página
  form: {
    minWidth: 350,
    maxWidth: 380,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  // Estilo para o título na página
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ff4500', // Cor laranja ousada
    marginBottom: 20,
    textAlign: 'center',
  },
  // Estilo para rótulos de campos
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  // Estilo para campos de entrada de dados
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  // Estilo para botões
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
  },
  // Estilo para o texto dos botões
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  // Estilo para mensagens de feedback
  mensagem: {
    fontSize: 18,
    color: 'red', // Cor vermelha
    marginTop: 10,
    textAlign: 'center',
  },
  // Estilo para links de registro
  registroLink: {
    fontSize: 16,
    color: '#007bff', // Cor de destaque azul
    textAlign: 'center',
    marginTop: 10, // Adiciona um espaçamento superior
  },
});

// Exporta os estilos
export default styles;
