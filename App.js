import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importa as páginas
import CadastrarAtendimentos from "./src/pages/CadastrarAtendimentos";
import ExibirAtendimentos from "./src/pages/ExibirAtendimentos";
import DetalheAtendimento from "./src/pages/DetalheAtendimento";
import Login from "./src/pages/Login";
import RegistroUsuario from "./src/pages/RegistroUsuario";

// navegador Stack
const Stack = createStackNavigator();

// Componente principal da aplicação
function App() {
  return (
    // Contêiner de Navegação
    <NavigationContainer>
      {/* Navegador Stack para gerenciar as transições entre telas */}
      <Stack.Navigator initialRouteName="Login">
        {/* Definindo as telas e seus componentes associados */}
        <Stack.Screen
          name="Cadastrar Atendimento"
          component={CadastrarAtendimentos}
        />
        <Stack.Screen
          name="Exibir Atendimentos"
          component={ExibirAtendimentos}
        />
        <Stack.Screen
          name="Detalhe de Atendimento"
          component={DetalheAtendimento}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro de Usuario" component={RegistroUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Exportanda o componente principal
export default App;
