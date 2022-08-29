export const getPockemons = async (url) => {
  const response = await fetch(url);
  
  return response.json();
};

export const getPockemonInfo = async (URL) => {
  const response = await fetch(URL);
  
  return response.json();
};