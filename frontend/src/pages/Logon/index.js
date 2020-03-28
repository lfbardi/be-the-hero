import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import Api from "../../services/Api";

import "./styles.css";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

const Logon = () => {
  const [id, setId] = useState("");
  const history = useHistory();

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const response = await Api.post("sessions", { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('profile');
    } catch (error) {
      alert('Login failed, try again.');
    }
  };

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <input
            placeholder="Your ID"
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <button className="button" type="submit">
            Sign in
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />I want to be a Hero
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
};

export default Logon;
