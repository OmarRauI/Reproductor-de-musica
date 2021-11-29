let play_btn = document.getElementById('play-btn')
let next_btn = document.getElementById('next-btn')
let prev_btn = document.getElementById('prev-btn')
let cancion = document.getElementById('cancion')
let caratula = document.getElementById('caratula')
let play_icon = document.getElementById('play-icon')

let volumen = document.getElementById('volume-control')

let estado = true
volumen.value  = 1
let progress;

function playSong(){
        cancion.play();
        caratula.style.animationPlayState = 'running'
        play_icon.classList.remove('mdi-play')
        play_icon.classList.add('mdi-pause')
        progress = setInterval(()=>{
            progress_bar.value = cancion.currentTime;
        },1000)
        estado = false;
}
function pauseSong(){
    cancion.pause();
    clearInterval(progress)
    caratula.style.animationPlayState = 'paused'
    play_icon.classList.remove('mdi-pause')
    play_icon.classList.add('mdi-play')
    estado = true;
}


play_btn.addEventListener('click',()=>{ 
    if(estado)
    {
        playSong()
    }
    else{
        pauseSong()
    }
})



addEventListener('keypress',(event)=>{
    if(event.code === 'Space'&& estado)
    {
        playSong()
    }
    else{
        pauseSong()
    }
})

volumen.addEventListener('change',()=>{
    cancion.volume = volumen.value;
})
let vol = 1;
addEventListener('keydown',(event)=>{
    
    if(event.key === 'ArrowUp'&&vol<1)
    {
        try{
            vol = vol + 0.01;
            cancion.volume = vol
            volumen.value = cancion.volume;
        }catch(error)
        {
            console.log(error)
        }
    }
    if(event.key === 'ArrowDown'&&vol>0)
    {
        try {
            vol = vol - 0.01;
            cancion.volume = vol
            volumen.value = cancion.volume;
            
        } catch (error) {
            console.log(error)
        }
        
    }
})


let progress_bar = document.getElementById('progress-bar')
setTimeout(()=>{
    progress_bar.setAttribute('max',cancion.duration)
},500)

progress_bar.value = 0;
progress_bar.addEventListener('change',()=>{
    cancion.currentTime = progress_bar.value;
})
cancion.addEventListener('ended',()=>{
    if(pos==canciones.length-1)
    {
        pauseSong()
    }
    else{
        progress_bar.value=0;
        if(pos<canciones.length-1)
        {   pos++;
            reproducir(pos)
        }
    }
})


let canciones = [
    {
        id:0,
        artista:'Egoist',
        titulo:'Unknow',
        genero:'pop',
        caratula:'egoist.jpg',
        archivo:'egoist.mp3'
    },
    {
        id:1,
        artista:'Kodaline',
        titulo:'Unknow',
        genero:'indie',
        caratula:'kodaline.jpg',
        archivo:'kodaline.m4a'
    },
    {
        id:2,
        artista:'One Ok Rock',
        titulo:'You can do it',
        genero:'rock',
        caratula:'oor-you can do it.jpg',
        archivo:'oor-you can do it.mp3'
    },
    {
        id:3,
        artista:'Mago de oz',
        titulo:'Abracadabra',
        genero:'rock',
        caratula:'ilussia.jpg',
        archivo:'Mago de oz Abracadabra.mp3'
    },
    {
        id:4,
        artista:'Mago de oz',
        titulo:'Cadavaria',
        genero:'rock',
        caratula:'ilussia.jpg',
        archivo:'Mago de oz Cadaveria.mp3'
    },
    
]

let pos = 0;

 function reproducir(indice)
{
    cancion.src = 'audio/'+canciones[indice].archivo;
    caratula.src = 'img/'+canciones[indice].caratula;
    
    setTimeout(()=>{
        progress_bar.max = cancion.duration
    },500)
    playSong();
}

next_btn.addEventListener('click',()=>{
    
    if(pos<canciones.length-1)
    {   pos++;
        reproducir(pos)
    }
})

prev_btn.addEventListener('click',()=>{
    
    if(pos>0)
    {pos--
        reproducir(pos)
    }
})

let contenedor_lista = document.getElementById('list-container')
function generarLista(songs){
    contenedor_lista.innerHTML = '';
    for(let item of songs)
    {
        contenedor_lista.insertAdjacentHTML('beforeend',`
        <article class="list-item" id="${item.id}">
            <img src="img/${item.caratula}">
            <div class="data">
                <div>Título: <span>${item.titulo}</span></div>
                <div>artista: <span>${item.artista}</span></div>
                
                
            </div>
        </article>
        `)
    }
}
generarLista(canciones)

contenedor_lista.addEventListener('click',(event)=>{
    if(event.target.matches('.list-item img'))
    {
        reproducir(event.target.parentNode.id)
        pos = event.target.parentNode.id
    }
    else if(event.target.matches('.data'))
    {
        reproducir(event.target.parentNode.id)
        pos = event.target.parentNode.id
    }
    else if(event.target.matches('.data div'))
    {
        reproducir(event.target.parentNode.parentNode.id)
        pos = event.target.parentNode.parentNode.id
    }
    else if(event.target.matches('.data div span')){
        reproducir(event.target.parentNode.parentNode.parentNode.id)
        pos = event.target.parentNode.parentNode.parentNode.id
    }
    else if(event.target.matches('.list-item')){
        reproducir(event.target.id)
        pos = event.target.id
    }
   
})

let filtrar_genero = document.getElementById('filter-genere')

filtrar_genero.addEventListener('change',(event)=>{
    
    if(filtrar_genero.value === 'all')
    {
        generarLista(canciones)
    }
    else{
        let filtrado = canciones.filter(el => el.genero === filtrar_genero.value)
        generarLista(filtrado)
    }

})

let filter_title = document.getElementById('filter-title')

filter_title.addEventListener('keyup',()=>{
    if(filter_title.value!='')
    {
        let fil = canciones.filter(elemento=>elemento.titulo.toLowerCase().includes(filter_title.value.toLowerCase()))
        generarLista(fil)
    }
    else{
        generarLista(canciones)
    }
    
}) 
let nombre = document.getElementById("nombre");
let tipo = document.getElementById("tipo");
let grupo = document.getElementById("grupo");
let guardar_btn = document.getElementById("save-btn");
let lista = docuement.getElementById("lista");
let pMusicas = [];
const guardar = () => {
    if (nombre.value && tipo.value && grupo.value) {
        mascotas.push({
            nombre: nombre.value,
            tipo: tipo.value,
            grupo: grupo.value,
        });
        localStorage.setItem("Musicas" , JSON.stringify(Musicas));
        nombre.value = "";
        tipo.value = "";
        grupo,value = "";
        pintar_datos();
    } else {
        alert("completa todos los campos");
    }
};

const get_datos_local = () => {
    let Musicas_local = localStoragetItem("Musicas");
    if (Musicas_local = null) {
        Musicas = JSON.parse(Musicas_local);
        pintar_datos()
    } 
}
guardar_btn.addEventListener("click" , ()=> {registrar ()})


