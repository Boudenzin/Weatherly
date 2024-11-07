import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [cidade, setCidade] = useState('');
    //Criação de Constantes começando com "" e podendo ser alteradas com setCidade [constante, como vamos altera-la ou valor dela]

    //Sempre que o usuário entrar no campo de digitação essa função é chamada
    const handleInputChange = event => {
        //Esse setCidade(o que está dentro é justamente o que foi digitado)
        setCidade(event.target.value);
    };
    
    //Função chamada quando o usuário clica no botão Buscar
    const handleSearch = () => {
        if (cidade.trim()) {
            onSearch(cidade); //chama a funcão onSearch do App.js e envia city como argumento
            setCidade(''); //Limpa o campo de entrada após a busca
        }
    };
    
    return (
        <div className="search-bar">
            <input
                type="text"
                value={cidade}
                onChange={handleInputChange}
                placeholder='Digite o nome da cidade' //Texto que vai aparecer quando estiver vazio
            ></input>
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
}

//Uso em outros arquivos
export default SearchBar;