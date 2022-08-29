import { getPockemons, getPockemonInfo } from './api.js';

const pockemonList = document.querySelector('.pockemons__list');
const loadMore = document.querySelector('.loadMore');
const sortSelect = document.querySelector('.sort_select');
const pockemonDetails = document.querySelector('.pockemons__details');
let numberOfPockemons = 12;
let pockemonsData = [];
let pockemonsType = [];
const API = 'https://pokeapi.co/api/v2/pokemon/?limit=';


// Load data of Pockemons with (name and url)
const loadPockemonsFromServer = async (pockemonNumbers) => {
    try {
      const pockemonsFromServer = await getPockemons(`${API}${pockemonNumbers}`);
      numberOfPockemons += 12;

      await loadPockemonInfoFromServer(pockemonsFromServer.results);
      await createOptions();
    } catch (error) {
      alert(error);
    }
};

loadPockemonsFromServer(numberOfPockemons);


// load data of Pockemons with all information by pockemon url
const loadPockemonInfoFromServer = async (pockemonsArr) => {
    const pockemonData = await Promise.all(pockemonsArr.map(async item => {
      const response = await getPockemonInfo(item.url);
      const newPockemon = {
        name: item.name,
        url: item.url,
        info: {
          sprites: response.sprites.front_default,
          moves: response.moves,
          stats: response.stats,
          types: response.types,
        },
      };

      return newPockemon;
    }));

    pockemonsData = pockemonData;
    showPockemon(pockemonData);
    await getPockemonType(pockemonData)
  };


  // load all pockemons types to render it in tag <option>
  const getPockemonType = async (data) => {
    const types = [];

    data.forEach(value => {
      value.info.types.forEach(item => {
        if (!types.includes(item.type.name)) {
          types.push(item.type.name);
        }
      });
    });

    pockemonsType = types;
  };


// render cards with pockemons
const showPockemon = (pockemons) => { 
  let rezult = '';
    pockemons.map(pockemon => (
      rezult +=
    `<li class="pockemons__item" data-name=${pockemon.name}>
      <img class="pockemons__image" src=${pockemon.info.sprites} alt="">
      <div class="pockemons__item-title">
        <b class="pockemons__name">${pockemon.name.charAt(0).toUpperCase() + pockemon.name.slice(1)}</b>
      </div>
      <div class="type_box">
      ${pockemon.info.types.map(item => (
        `<p class="${item.type.name}">${item.type.name}<p>`
    ))}
      </div>
    </li>`
  ))

  pockemonList.innerHTML = rezult;

  document.querySelectorAll(".pockemons__item").forEach(item => {
    item.addEventListener('click', function(event) {
      let a = [...pockemons].filter(item => item.name === event.currentTarget.dataset.name)
      console.log(a);
      showPockemonDetails(a)
    })
  })
}

// create tag <select> with <options>
const createOptions = async() => {
  let sortValue = '';
  pockemonsType.map(item => {
    sortValue += `<option value="${item}">${item}</option>`
  })

  sortSelect.innerHTML += sortValue;
}

//load next 12 pockemons
loadMore.addEventListener('click', () => {
  loadPockemonsFromServer(numberOfPockemons);
});

//sort pockmons by types
sortSelect.addEventListener('change', (event) => {
  if (event.target.value === 'All') {
    showPockemon(pockemonsData);
  } else {
    let rezult = [...pockemonsData].filter(pockemon => pockemon.info.types.some(item => item.type.name === event.target.value));
    showPockemon(rezult);
  }

  pockemonDetails.style.display = "none";
});

//create card with details pockemon 

const showPockemonDetails = (pockemon) => {
  pockemonDetails.innerHTML = 
  `<img 
    class="details__image" 
    src=${pockemon[0].info.sprites} 
    alt='pockemonimage'
   >
   </img>
   <b class="details__name">${pockemon[0].name.charAt(0).toUpperCase() + pockemon[0].name.slice(1)}</b>
   <div class="type_box">
      ${pockemon[0].info.types.map(item => (
        `<p class="${item.type.name}">${item.type.name}<p>`
      ))}
      </div>
   <div class="details__statys">
   ${pockemon[0].info.stats.map(item => (
     `<div class="details__statys_box">
        <p class="details__statys_name">${item.stat.name}</p>
        <p class="details__statys_base">${item.base_stat}</p>
      </div>`
   ))}
   </div>
  `
  pockemonDetails.style.top = window.scrollY > 50 ? `${window.scrollY}px` : '100px';
  pockemonDetails.style.display = "block";
}