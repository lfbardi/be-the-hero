import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import Api from '../../services/Api';

import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";

const NewIncident = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  const handleNewIncident = async (event) => {
    event.preventDefault();

    const data = { title, description, value }

    try {
      await Api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch (error) { 
      alert('Create incident failed, try again.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Create New Incident</h1>
          <p>Describe the incident in detail to find a hero to solve this.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <textarea 
            placeholder="Description"
            value={description}
            onChange={event => setDescription(event.target.value)} 
          />

          <input 
            placeholder="$ Amount"
            value={value}
            onChange={event => setValue(event.target.value)} 
          />

          <button className="button" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewIncident;
