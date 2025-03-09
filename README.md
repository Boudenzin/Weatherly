# Weatherly

O **Weatherly** é um site de previsão do tempo desenvolvido com **React**, **JavaScript** e **Chart.js**. O objetivo principal é fornecer uma interface intuitiva e visualmente atraente para os usuários consultarem a previsão do tempo de qualquer cidade. O projeto foi criado como parte de um **Project-Based Learning (PBL)** para aprimorar habilidades em desenvolvimento web com React e integração de APIs.

---

## Funcionalidades

- **Busca por Cidade**: Permite ao usuário buscar a previsão do tempo de qualquer cidade.
- **Exibição de Dados Atuais**: Mostra a temperatura atual, descrição do clima, velocidade do vento e umidade.
- **Gráfico de Previsão**: Exibe um gráfico de linha com a previsão de temperatura para as próximas horas.
- **Ícones Dinâmicos**: Ícones de clima que mudam de acordo com a descrição do tempo e o período do dia (dia/noite).
- **Responsividade**: Design adaptável para diferentes tamanhos de tela.

---

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface do usuário.
- **Chart.js**: Biblioteca para criação de gráficos interativos.
- **OpenWeatherMap API**: API usada para obter dados de previsão do tempo.
- **CSS**: Estilização da interface, incluindo layout, cores e animações.
- **JavaScript**: Lógica de programação para manipulação de dados e interações.

---

## Como Executar o Projeto

### Pré-requisitos
- Node.js e npm instalados.
- Uma chave de API do OpenWeatherMap (obtenha em [OpenWeatherMap](https://openweathermap.org/api)).

### Passos para Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/Boudenzin/Weatherly.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd Weatherly
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API:
   ```env
   REACT_APP_API_KEY=sua_chave_api_aqui
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

6. Abra o navegador e acesse:
   ```
   http://localhost:3000
   ```

7. Digite o nome de uma cidade no campo de busca e veja a previsão do tempo!

---

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
Weather-Forecast-Website/
├── public/                  # Arquivos estáticos (ícones, imagens, etc.).
├── src/
│   ├── components/          # Componentes React (SearchBar, WeatherCard, WeatherChart).
│   ├── util/                # Utilitários (funções auxiliares, como getWeatherIcon).
│   ├── App.js               # Componente principal da aplicação.
│   ├── App.css              # Estilos globais.
│   ├── index.js             # Ponto de entrada da aplicação.
├── .env                     # Arquivo de configuração para variáveis de ambiente.
├── README.md                # Este arquivo.
```

### Detalhes do Código

- **App.js**:
  - Gerencia o estado da aplicação e faz chamadas à API do OpenWeatherMap.
  - Renderiza os componentes `SearchBar`, `WeatherCard` e `WeatherChart`.

- **SearchBar.js**:
  - Componente de busca que permite ao usuário digitar o nome da cidade.
  - Detecta a tecla "Enter" para iniciar a busca.

- **WeatherCard.js**:
  - Exibe os dados atuais do clima, como temperatura, descrição, vento e umidade.
  - Utiliza ícones dinâmicos baseados na descrição do tempo e no período do dia.

- **WeatherChart.js**:
  - Cria um gráfico de linha com a previsão de temperatura para as próximas horas.
  - Usa a biblioteca Chart.js para renderizar o gráfico.

- **getWeatherIcon.js**:
  - Função que retorna o ícone correto com base na descrição do tempo e no período do dia.

---

## Próximos Objetivos

1. **Previsão de 5 Dias**:
   - Adicionar uma seção para exibir a previsão do tempo para os próximos 5 dias.

2. **Integração com Geolocalização**:
   - Usar a API de geolocalização do navegador para buscar automaticamente a previsão do tempo da localização do usuário.

3. **Temas Personalizados**:
   - Adicionar temas claros e escuros para melhorar a experiência do usuário.

4. **Testes Automatizados**:
   - Implementar testes unitários e de integração para garantir a qualidade do código.

5. **Deploy**:
   - Publicar o projeto em uma plataforma como GitHub Pages, Netlify ou Vercel.

6. **Internacionalização**:
   - Adicionar suporte para múltiplos idiomas.

7. **Animações**:
   - Incluir animações suaves para transições entre estados da aplicação.

---

## Issues

Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma **issue** no repositório do projeto. Sua contribuição é muito bem-vinda!

1. Acesse o repositório: [Weatherly](https://github.com/Boudenzin/Weatherly).
2. Clique na aba **Issues**.
3. Clique em **New Issue** e descreva o problema ou sugestão.

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
