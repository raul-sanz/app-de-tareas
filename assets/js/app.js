//variable
const listaTweets = document.getElementById('lista-tweets');

//addEventListeners
eventListeners();

function eventListeners (){
	document.getElementById('formulario').addEventListener('submit', agregarTweet);
	
	listaTweets.addEventListener('click', borrarTweet);

	document.addEventListener('DOMContentLoaded', localStorageListo);
}

//agregar tweet

 function agregarTweet (e) {
	e.preventDefault();
	const tweet = document.getElementById('tweet').value;
	if (tweet == ''){
		alert('Porfavor Escriba Una Tarea Pendiente');
	}else{
		const botonBorrar = document.createElement('a');
			botonBorrar.classList= 'borrar-tweet';
			botonBorrar.innerText = 'x';

			
			const li = document.createElement('li');
			li.innerText = tweet;
			li.appendChild(botonBorrar);
			listaTweets.appendChild(li);

			agregarTweetLocalStorage(tweet);
	}
	
}

function borrarTweet (e){
	e.preventDefault();
	if(e.target.className === 'borrar-tweet'){
		e.target.parentElement.remove();

		borarTweetLocalStorage(e.target.parentElement.innerText);
	}
}

function localStorageListo(){
	let tweets;
	tweets = obtenerTweetLocalStorage();

	tweets.forEach( function (tweet) {

	const botonBorrar = document.createElement('a');
	botonBorrar.classList= 'borrar-tweet';
	botonBorrar.innerText = 'x';

	
	const li = document.createElement('li');
	li.innerText = tweet;
	li.appendChild(botonBorrar);
	listaTweets.appendChild(li);

	});
}

function agregarTweetLocalStorage(tweet){
		let tweets ;
		tweets = obtenerTweetLocalStorage();

		tweets.push(tweet);
		localStorage.setItem('tweets', JSON.stringify(tweets));
}

function obtenerTweetLocalStorage(){
	let tweets;
	if(localStorage.getItem('tweets') === null ){
		tweets = [];
	}else{
		tweets =  JSON.parse(localStorage.getItem('tweets'));
	}
	return tweets;
}


function borarTweetLocalStorage(tweet){
	
	let tweets, tweetBorrar;

	tweetBorrar = tweet.substring(0 , tweet.length -1);
	
	tweets = obtenerTweetLocalStorage();

	tweets.forEach(function(tweet, index){
		if(tweetBorrar === tweet){
			tweets.splice(index, 1);
		}
	});

	localStorage.setItem('tweets', JSON.stringify(tweets) );
	
}