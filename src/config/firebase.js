// Importa as funções necessárias do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8V2SVAPfQDxl6lu7nLmwz4RtZYhugtaY",
  authDomain: "fir-react-7c941.firebaseapp.com",
  projectId: "fir-react-7c941",
  storageBucket: "fir-react-7c941.appspot.com",
  messagingSenderId: "782016122150",
  appId: "1:782016122150:web:e7d353209b49aa0dc985e7",
  measurementId: "G-J0H9ZGZFYH",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
// Obtém uma instância do Firestore associada ao app inicializado
const database = getFirestore(app);
// Obtém uma instância de autenticação associada ao app inicializado
const auth = getAuth(app);

// Função useAuth para exportar o objeto auth
const useAuth = () => {
  return auth;
};

// Exporta as instâncias do app, do Firestore, do objeto auth e a função useAuth
export { app, database, auth, useAuth };
