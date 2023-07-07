
import axios from "axios";
import "./register.css";
import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";

function Register() {
  const [formValues, setFormValues] = useState({
    usuario: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    usuario: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const datosRegister = {
    usuario: formValues.usuario,
    email: formValues.email,
    password: formValues.password,
  };

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let errors = {};

    if (formValues.usuario.length === 0 || formValues.usuario.length < 3) {
      errors.usuario = "Ingrese un nombre de usuario válido";
    }

    if (!formValues.email) {
      errors.email = "Ingrese un correo electrónico válido";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/.test(
      formValues.password
    ) ||formValues.password !== formValues.confirmPassword) {
      errors.password =
        "La contraseña debe tener al menos 6 caracteres o no coiciden";
    } 
    setFormErrors(errors);

    

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post("http://localhost:4000/register", datosRegister);
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="layout-container">
      <div className="register-container">
        <form className="form-container-register" onSubmit={handleSubmit}>
          <h2 className="text-register">Registrate</h2>

          <div className="form-group-register">
            <input
              className="form-item-register"
              type="text"
              placeholder="Ingresa un nombre de usuario"
              name="usuario"
              value={formValues.usuario}
              onChange={handleChange}
            />
            <div className="form-errors-register">
              {formErrors.usuario && <p>{formErrors.usuario}</p>}
            </div>
          </div>

          <div className="form-group-register">
            <input
              className="form-item-register"
              type="email"
              placeholder="Ingresa un correo"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <div className="form-errors-register">
              {formErrors.email && <p>{formErrors.email}</p>}
            </div>
          </div>

          <div className="form-group-register">
            <input
              className="form-item-register"
              type="password"
              placeholder="Ingresa una contraseña"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-errors-register">
            {formErrors.password && <p>{formErrors.password}</p>}
          </div>
          <div className="form-group-register">
            <input
              className="form-item-register"
              type="password"
              placeholder="Repite la contraseña"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-errors-register"></div>
          <div className="form-group-register">
            <button type="submit">Registrarse</button>
          </div>
          <p className="link-register">
            ¿Ya tienes una cuenta?
            <br />
            <Link to="/login">haz click aqui</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Register;
