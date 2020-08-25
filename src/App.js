import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
  async function consultaApi(){
    const response = await api.get('/repositories');
    setRepositories(response.data)
}
consultaApi()
},[])

  async function handleAddRepository() {
   const response = await api.post('repositories', {
      title:`novo repositorio ${Date.now()}`,
      url:"https://github.com/Rocketseat/umbriel",
      techs:["nodeJS", "React"]
   });

   const repository = response.data

   setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {

  const response = repositories;

  await api.delete(`repositories/${id}`);

  const responseIndex = response.findIndex(repository => repository === id);

  response.splice(responseIndex, 1)

  setRepositories([...response])
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(response => (
             <li key={response.id}> {response.title}
      
            <button onClick={() => handleRemoveRepository(`${response.id}`)}>
              Remover
            </button>
            
            </li>
      ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;