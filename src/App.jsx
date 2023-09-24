import { AppRouter } from "./routes";
import "./assets/global.css"
import { AuthProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.css';

export const App = () => {
  
  return (
    <AuthProvider>
    <AppRouter/>
    </AuthProvider>
  );
}