import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
      })
}, []);
  async function handleAddRepository() {
    const response = await api.post('repositories', {
        "title": "Projeto em React Native",
        "url": "https://github.com/rocketseat-education/bootcamp-gostack-desafios",
        "techs": ["Node.js", "React", "React Native"]
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`, {
      
    });

    const removed = repositories.findIndex((repo) => (repo.id === id));

    const temprepos = [...repositories];

    temprepos.splice(removed, 1);

    setRepositories(temprepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
