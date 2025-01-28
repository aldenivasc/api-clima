
async function getWeatherData(city) {
  const apiKey = "11ec8907c0d4b178da911700fc9c606a"; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`;

  console.log("Iniciando a requisição para a cidade:", city); 

  try {
    const response = await fetch(apiUrl); 
    console.log("Resposta da API:", response); 

    if (!response.ok) {
      
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json(); 
    console.log("Dados recebidos:", data); 

    displayWeatherData(data);
  } catch (error) {
   
    console.error("Ocorreu um erro ao obter os dados do clima:", error.message);
    displayError(error.message);
  }
}


function displayWeatherData(data) {
  const weatherContainer = document.getElementById("weather-container");

  weatherContainer.innerHTML = `
    <h2>Informações do Clima em ${data.name}</h2>
    <p><strong>Temperatura:</strong> ${data.main.temp} °C</p>
    <p><strong>Condição:</strong> ${data.weather[0].description}</p>
    <p><strong>Umidade:</strong> ${data.main.humidity} %</p>
    <p><strong>Velocidade do vento:</strong> ${data.wind.speed} m/s</p>
  `;
}

// Função para exibir um erro na tela
function displayError(message) {
  const weatherContainer = document.getElementById("weather-container");
  weatherContainer.innerHTML = `<p>Ocorreu um erro: ${message}</p>`;
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  console.log("Pagina carregada, buscando dados do clima...");
  // Altere "São Paulo" para qualquer cidade que desejar
  getWeatherData("Sao Paulo");
});
