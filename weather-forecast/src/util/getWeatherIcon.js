
export function getWeatherIcon(description, isDaytime) {
  const desc = description.toLowerCase();
  
  if (desc.includes("céu limpo")) {
    return isDaytime ? "/assets/3d-weather-icons/sun/26.png" : "/assets/3d-weather-icons/moon/10.png";
  } else if (desc.includes("chuva")) {
    return isDaytime ? "/assets/3d-weather-icons/sun/9.png" : "/assets/3d-weather-icons/moon/1.png";
  } else if (desc.includes("nublado") || (desc.includes)("nuvens dispersas")) {
    return isDaytime ? "/assets/3d-weather-icons/sun/27.png" : "/assets/3d-weather-icons/moon/15.png";
  } else if (desc.includes("tempestade")) {
    return isDaytime ? "/assets/3d-weather-icons/sun/28.png" : "/assets/3d-weather-icons/moon/20.png";
  }
  // Ícone padrão
  return "/assets/3d-weather-icons/snow/36.png";
}
