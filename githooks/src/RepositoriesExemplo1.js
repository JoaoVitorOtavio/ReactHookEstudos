import React, { useState } from 'react';

export default function RepositoriesExemplo1() {
  //quando se tem uma function e nao uma classe nao se pode mais declarar propertis dentro da função, entao nao se pode mais fazer o state, no lugar dele se usar ************useState*************** tem que realizar a importação dele
  const [repositories, setRepositories] = useState([
    { id: 1, name: 'repo-teste' },
    { id: 2, name: 'repo-teste2' },
    { id: 3, name: 'repo-teste3' }
  ])
  // EXEMPLO DE COMO FICARIA SEM O REACT HOOKS
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     repositories:[]
  //   };
  // }
  // const [ este vetor que tem o valor vindo do useState, retorna dois indices, **O valor do estado em si** e uma função que vai permitir atualizar o valor do mesmo estado] = useState(VALOR INICIAL)

  function handleAddRepository(){
    setRepositories([...repositories, {id: Math.random, name: 'novo Repo'}])
    // setRepositories([...copiar todos repositorios que ja possui, {Criar um novo}])
  }

  return (
    // DIV COMO SE FOSSE REACT FRAGMENTE, NAO TEM VALOR E INTERAÇÃO COM O HTML, SOMENTE UM CONTAINER
    <> 
      <ul>
        {repositories.map(repo =>
          <li key={repo.id}>
            {repo.name}
          </li>
        )}
      </ul>
      {/* no on click nao se usa mais o this, pois nao estamos utilizando a sintaxe de classe, entao nao é necessario */}
      <button onClick={handleAddRepository}>
          Add Repositorio
      </button>
    </>
  )
}
