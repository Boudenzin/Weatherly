// src/utils/getWeatherIcon.js
export function getWeatherIcon(description) {
    const desc = description.toLowerCase();
    
    if (desc.includes("ensolarado") || desc.includes("sol")) {
      return "/assets/3d-weather-icons/sun/26.png";
    } else if (desc.includes("chuva")) {
      return "/assets/3d-weather-icons/rain/26.png";
    } else if (desc.includes("nublado")) {
      return "/assets/3d-weather-icons/cloud/26.png";
    } else if (desc.includes("neve")) {
      return "/assets/3d-weather-icons/snow/26.png";
    } 
    // Adicione mais condições conforme necessário
    return "/assets/3d-weather-icons/default/26.png"; // Ícone padrão
  }
  