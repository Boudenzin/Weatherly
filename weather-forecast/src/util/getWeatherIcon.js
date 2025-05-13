
export function getWeatherIcon(description, isDaytime) {
  const desc = description.toLowerCase();
  
  if (desc.includes("céu limpo")) {
    return isDaytime ? "/assets/3d-weather-icons/sun/26.png" : "/assets/3d-weather-icons/moon/10.png";
  } else if (desc.includes("chuva leve")) {
    return isDaytime ? "/assets/3d-weather-icons/sun/8.png" : "/assets/3d-weather-icons/moon/1.png";
  } else if (desc.includes("parcialmente nublado") || desc.includes("nuvens dispersas") || desc.includes("algumas nuvens")  || desc.includes("nublado")) {
    return isDaytime ? "/assets/3d-weather-icons/sun/27.png" : "/assets/3d-weather-icons/moon/15.png";
  } else if (desc.includes("tempestade")) {
    return isDaytime ? "/assets/3d-weather-icons/sun/28.png" : "/assets/3d-weather-icons/moon/20.png";

  } else if (desc.includes("chuva forte")) {
    return isDaytime ? "/assets/3d-weather-icons/sun/13.png" : "/assets/3d-weather-icons/moon/2-1.png";
  } else if (desc.includes("céu coberto")) {
    return "/assets/3d-weather-icons/cloud/35.png";
  } 
  // Ícone padrão
  return "/assets/3d-weather-icons/snow/36.png";
}
