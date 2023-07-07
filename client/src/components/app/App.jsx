import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

function App() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <button onClick={logout}>cerrar sesion</button>
    </div>
  );
}

export default App;
