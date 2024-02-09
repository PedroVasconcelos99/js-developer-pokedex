const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const pokemonCard = document.getElementById('pokemonCard')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}" "> 
    <button class="showInfo" data-number="${pokemon.number}"> 
        
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            </button>
        </li>
    `
}


function showPokemonDetails(pokemon) {
    
    return  `
    <div class="card-wrapper ${pokemon.type}">
    <div class="cardHeader" >
        <div>
            <h1>${pokemon.name}</h1>
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>
        <spanc class="number">#${pokemon.number}</span>
    </div>
    <img class="photo" src="${pokemon.photo}" alt="">
    <div class="info">
        <div class="about">
            <h2>about</h2>
            <ul>
                <li>species ${pokemon.species}</li>
                <li>height ${pokemon.height}</li>
                <li>weight ${pokemon.weight}</li>
                <li>abilities ${pokemon.abilities.map((ability)=> ability) }</li>
            </ul>
        </div>
        <div class="stats">
            <h2>stats</h2>
                <ul>
                ${pokemon.stats.map((stats) => `<li>${stats}</li>`).join('')}
                </ul>
            </div>
            
    </div>
    
    
    
    `
}


document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemonList');

    pokemonList.addEventListener('click', function(event) {
        const showInfoBtn = event.target.closest('.showInfo');

        if (showInfoBtn) {
            const pokemonNumber = showInfoBtn.dataset.number; 
            document.querySelector('.detailCard').style.display = 'block'
            LoadPokemonInfo(parseInt(pokemonNumber,10))
            
        }
    });
});



function LoadPokemonInfo(number) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const pokemon = pokemons.find(pokemon=>pokemon.number===number )
        pokemonCard.innerHTML = showPokemonDetails(pokemon)
    })
}

document.getElementById('closeBtn').addEventListener('click',function () {
    document.querySelector('.detailCard').style.display = 'none'
}) 

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})