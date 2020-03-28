import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Api from "../../services/Api";

import "./styles.css";

import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";

const Register = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  const handleRegister = async event => {
    event.preventDefault();

    const data = { name, email, whatsapp, city, uf };

    try {
      const response = await Api.post("ongs", data);
      alert(`Your ID: ${response.data.id}`);

      history.push('/');
    } catch (error) {
      alert(error.message);
    }

  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Sign Up</h1>
          <p>
            Be a Hero, enter the platform and help people find the cases of your
            NGO.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            I'm already a Hero
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="NGO Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={event => setWhatsapp(event.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="City"
              value={city}
              onChange={event => setCity(event.target.value)}
            />

            <input
              style={{ width: 80 }}
              placeholder="UF"
              value={uf}
              onChange={event => setUf(event.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
