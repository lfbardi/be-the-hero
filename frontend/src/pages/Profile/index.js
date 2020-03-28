import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import Api from "../../services/Api";

import logoImg from "../../assets/logo.svg";
import { FiPower, FiTrash2 } from "react-icons/fi";

const Profile = () => {
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    Api.get("profile", {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data);
    });
  }, [ongId]);

  const handleDeleteIncident = async id => {
    try {
      await Api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert("Delete failed, try again.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();

    history.push("/");
  };

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Welcome, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Register new case
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Your Cases</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASE:</strong>
            <p>{incident.title}</p>

            <strong>Description:</strong>
            <p>{incident.description}</p>

            <strong>Amount:</strong>
            <p>
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#A8A8B3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
