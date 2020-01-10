import React, { useState, useEffect } from 'react';
// useState => serve para substituir o this.state
// useEffect => substitui o componentdidmount, componentdidupdate e componentwillunmount

export default function RepositoriesExemplo2() {
  const [repositories, setRespositories] = useState([])

  useEffect(async () => {
    const response = await fetch('http://api.github.com/users/JoaoVitorOtavio/repos')
    const data = await response.json();

    setRespositories(data)
    // como se fosse o corpo do ComponentDidMount, didUpdate...
  }, [])//em quais circunstancias essa função deve ser executada, voce passa variaveis e é como se falasse pro use effect "eu só quero executar esse effect quando uma das variaveis mudar"e sempre que uma das variaveis mudar o useEffect executa automaticamente, passando o array vazio ele nao vai executar novamente o effect em situação nenhuma, só vai ser executada uma vez quando a pagina for iniciada

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `Voce tem ${filtered.length} repositorios favoritados`
  }, [repositories]) /* nesse formato foi feito como se fosse um componente didupdate, pois esse useEffect só vai ser executado quando repositories realizar uma mudança*/

  // ****OBS**** VOCE PODE TER VARIOAS EFFECTS NA PAGINA, NAO É RECOMENDADO TER SÓ 1 PARA EXECUTAR TUDO   

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id == id ? { ...repo, favorite: !repo.favorite } : repo
    })

    setRespositories(newRepositories);
  }

  return (
    <ul>
      {repositories.map(repo =>
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>(Favorito) </span>}
          {/* && é como se fosse o ternario ? : , porem se for true ele retorna algo, se nao só ignora */}
          <button onClick={() => handleFavorite(repo.id)}> {repo.favorite ? 'Desfavoritar' : 'Favoritar'}</button>
        </li>
      )}
    </ul>
  )
}
