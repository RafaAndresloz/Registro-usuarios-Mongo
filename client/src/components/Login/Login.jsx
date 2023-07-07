import axios from "axios";
import "./login.css";
import { useState } from "react";
import {Link,useNavigate} from "react-router-dom/dist/umd/react-router-dom.development";

function Login() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    let errors = {};

    const datosLogin = {
      email: formValues.email,
      password: formValues.password,
    };

    if (!formValues.email) {
      errors.email = "Ingrese un correo electrónico válido";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
    ) {
      formErrors.email = "El correo ingresado no es valido";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      await axios.post("http://localhost:4000/login", datosLogin)
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            if (res.data.token) {
              localStorage.setItem("token", res.data.token);
              console.log("Token almacenado:", localStorage.getItem("token"));
              navigate("/home");
            } else {
              Swal.fire("El correo o la contraseña ingresados son invalidos");
            }
          }
        });
    }
  }
  return (
    <div className="layout-container">
      <div className="login-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className="text">Login</h2>
          <div className="form-group">
            <input
              className="form-item"
              type="email"
              name="email"
              placeholder="Ingresa tu correo"
              value={formValues.email}
              onChange={handleChange}
            />
            <div className="form-errors">
              {formErrors.email && <p>{formErrors.email}</p>}
            </div>
          </div>

          <div className="form-group">
            <input
              className="form-item"
              type="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-errors">
            {formErrors.password && <p>{formErrors.password}</p>}
          </div>
          <div className="form-group">
            <button type="submit">Entrar</button>
          </div>
          <p className="link">
            ¿Olvidaste tu contraseña?
            <br />
            <a href="#">haz click aqui</a>
          </p>
          <p className="link">
            ¿Aun no tienes una cuenta?{" "}
            <Link to="/register">haz click aqui</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
