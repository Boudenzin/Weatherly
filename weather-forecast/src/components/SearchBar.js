// Importa React e o hook useState para gerenciar estado local
import React, { useState } from 'react';
// Importa o CSS específico do componente
import "./SearchBar.css";

/**
 * Componente SearchBar
 * 
 * Permite ao usuário digitar o nome de uma cidade e iniciar uma busca
 * de previsão do tempo. Chama a função 'onSearch' passada via props.
 * 
 * @param {function} onSearch - Função que será chamada ao buscar uma cidade
 */
function SearchBar({ onSearch }) {
    
    // Estado que armazena o valor digitado no input
    const [cidade, setCidade] = useState('');

    /**
     * Atualiza o estado 'cidade' sempre que o usuário digita algo no input.
     * @param {object} event - Evento disparado pelo input
     */
    const handleInputChange = event => {
        setCidade(event.target.value);
    };
    
    /**
     * Chama a função de busca (onSearch) se a cidade tiver sido preenchida.
     * Também limpa o input após a busca.
     */
    const handleSearch = () => {
        if (cidade.trim()) {
            onSearch(cidade); // Chama a função recebida do componente pai
            setCidade('');    // Limpa o campo de texto
        }
    };

    /**
     * Detecta a tecla Enter no input e chama a busca.
     * @param {object} event - Evento do teclado
     */
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    
    return (
        <div className="search-bar">
            <input
                type="text"
                value={cidade}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder='Digite o nome da cidade'
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
}

// Exporta o componente para ser utilizado em outros arquivos
export default SearchBar;
