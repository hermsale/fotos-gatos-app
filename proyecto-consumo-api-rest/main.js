const API_KEY = 'live_9vU1zH5wvwihzKOprl7XpQoBpTuLu5eEmYZUiYekMwtjykqGOj8AVrRmXtbqQeZv';

// guardamos el params en un array, aplicamos el join '' para que no separe el contenido del array con ','
let queryParams = ['?','limit=3'].join('');

const URL = `https://api.thecatapi.com/v1/images/search${queryParams}&api_key=${API_KEY}`;
const URLFAVORITES = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`
const URLFAVORITESDELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');

async function reload(){
    const response = await fetch(URL);
    const data = await response.json();

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}

reload();
getFavorites();

async function getFavorites(){
    // imgFav = document.querySelector('#imgFav');
    const imgFav = document.getElementById('imgFav');
    const response = await fetch(URLFAVORITES);
    const data = await response.json();

    console.log(data);

    imgFav.innerHTML = '';
    section = document.createElement('section');
    section.setAttribute('id','imgFav');

    h2 = document.createElement('h2');
    h2.innerText = ('Imagenes Favoritas');
    // <h2>Imagenes favoritas</h2>
    imgFav.appendChild(h2);
    
    data.map(elemento => {
        imgFav.innerHTML += `
        <article>
              <img id="img1" src="${elemento.image.url}" alt="Foto gatito aleatorio">
              <button onclick='deleteImg(${elemento.id})'>Retirar imagen de favoritos</button>
            </article>
          </section>
        `
    })

}

async function deleteImg(id){
    console.log('click',id);
    const response = await fetch(URLFAVORITESDELETE(id),{
        method: 'DELETE',
    });
    const data = await response.json();

    if (response.status==200){
        console.log('borrado exitosamente');
        console.log(data);
        getFavorites();
    }else{
        console.log('hubo un inconveniente');
    }
}