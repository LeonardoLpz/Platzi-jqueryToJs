console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}



const getUserAll= new Promise(function(todoBien, todoMal){
    
    setTimeout(function(){
      todoBien('se acabó el tiempo')
    },5000)
    
     
})

const getUser = new Promise(function(todoBien, todoMal){
    
  setTimeout(function(){
    todoBien('se acabó el tiempo')
  },3000)
  
   
})
// getUser
//   .then(function() {
//     console.log('Todo esta bien en la vida')
//   })
//   .catch(function(messageError){
//     console.log(messageError)
//   })
 
  Promise.all([
    getUser,
    getUserAll
  ])
    .then(function(message){
      console.log(message)
    })
    .catch(function(message){
      console.log(message)
    })





    $.ajax('https://randomuser.me/api/', {
        method:'GET',
        success: function(data) {
          console.log(data)
        },
        error: function(error) {
          console.log(error)
        }
    })


    fetch('https://randomuser.me/api/t')
      .then(function(response) {
        console.log(response)
        return response.json()
      })
      .then(function(user) {
        console.log('user',user.results[0].name.first)
      })
      .catch(function(){
        console.log('Algo falló jeje')
      });


      // funcion asincrona para traer los datos del servidor API
      (async function load() {
        // await
        // funcion asincrona que recibe la url de la api que espera para recibir la respuesta de la api y la convierte a json, retorna los datos en formato JSON
        async function getData(url) {
          const response = await fetch(url)
          const data = await response.json()
          return data
        }
        const $form = document.getElementById('form')
        $form.addEventListener('submit', (event) => {
          event.preventDefault()
        })
        // guardamos en constantes la informacion de cada genero desde la api
         const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
         const horrorList = await getData('https://yts.mx/api/v2/list_movies.json?genre=horror')
         const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')
        
         //  imprimimos en consola cada json almacenado en las constantes del genero de pelicula
        console.log(horrorList,actionList, animationList)
        
       
        // selectores para las secciones de cada genero de las peliculas
        const $actionContainer = document.querySelector('#action') 
        const $dramaContainer = document.getElementById('drama')
        const $animationContainer = document.getElementById('animation')

        // selector para la seccion del feature

        const $featuringContainer = document.getElementById('featuring')
        
      
        
        // selector para el home, la parte principal
        const $home = document.getElementById('home')

        // selectores para el modal y el overlay 
        const $modal = document.getElementById('modal')
        const $overlay = document.getElementById('overlay')
        const $hideModal = document.getElementById('hide-modal')


        // selectores del modal
        const $modalDescription = $modal.querySelector('p')
        const $modalTitle = $modal.querySelector('h1')
        const $modalImage = $modal.querySelector('img')

        
        function videoTemplate(movie) {
          // la funcion retorna los elentos en HTML y con variable template usamos el parametro que es el objeto movie
          return (
            `<div class="primaryPlaylistItem"> 
            <div class="primaryPlaylistItem-image"> 
              <img src="${movie.medium_cover_image}"> 
            </div> 
            <h4 class="primaryPlaylistItem-title"> 
              ${movie.title}
            </h4>
            </div>`
          )
        }

        function createTemplate(HTMLString){
           // creo un documento html y lo asigno a una constante para usarlo despues
           const html = document.implementation.createHTMLDocument();
           // del documento html creado modifico el body  con el template para las peliculas
           html.body.innerHTML = HTMLString;
          return html.body.children[0]  
        }
        function addEventClick($element){
          $element.addEventListener('click',() => {
            alert('click')
          })
        }
        function renderMovieList(list,$container){
            
            $container.children[0].remove()
            list.forEach((movie) => {
              
              const HTMLString = videoTemplate(movie);
              const movieElement = createTemplate(HTMLString)
              $container.append(movieElement)
              addEventClick(movieElement)
              
            })
            
            
        }
        
        
renderMovieList(actionList.data.movies ,$actionContainer)
renderMovieList(horrorList.data.movies ,$dramaContainer)
renderMovieList(animationList.data.movies ,$animationContainer)

    

      })()


