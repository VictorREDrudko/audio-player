// Плейер
const player = document.querySelector('.player');
// Кнопки плейера
const buttonPrev = document.querySelector('.button_prev');
const buttonNext = document.querySelector('.button_next');
const buttonPlay = document.querySelector('.button_play');
// audio
const audio = document.querySelector('.audio');
// Иконки play & pause
const iconPlay = document.querySelector('.icon_play');
// Названия
const band = document.querySelector('.title_band'); 
const nameSong = document.querySelector('.title_song'); 
// Картинка трека
const imageWrapper = document.querySelector('.wrapper__img'); 
const imageSong = document.querySelector('.logo_song'); 
// Прогресс
const progressContainer = document.querySelector('.progress');
const progressLine = document.querySelector('.line_progress');
let timeDuration = document.querySelector('.time_duration');
let timeCurrent = document.querySelector('.time');



// Массив песен и исполнителей
const songs = ['in the end', 'inside', 'lost'];
const bands = ['#linkin park#', 'linkin park', '*linkin park*'];
const timeSong = ['3:39', '2:54', '3:12']

// песня по умолчанию
let songIndex = 0;

// Воспроизведение трека
function initSong(song) {
	nameSong.innerHTML = song;
	audio.src = `audio/${song}.mp3`;
	imageSong.src = `img/linkin${songIndex + 1}.jpg`;
	band.textContent = bands[songIndex];
	imageWrapper.src = `img/linkin${songIndex + 1}.jpg`;

}

initSong(songs[songIndex])

// Play
function play() {
	player.classList.add('play');
	audio.play();
	iconPlay.src = 'img/pause.png';
	iconPlay.style.padding = '15px 0'
}

// Pause
function pause() {
	player.classList.remove('play');
	audio.pause();
	iconPlay.src = 'img/play.jpg';
	iconPlay.style.padding = '0'
}

buttonPlay.addEventListener("click", () => {
	// переменная проверяет есть ли у нашего плейера класс play
	const playing = player.classList.contains('play');
	if(playing) {
		pause()
	} else {
		play()
	}
})

// переключение треков
function next() {
	songIndex++;
	if(songIndex > songs.length - 1) {
		songIndex = 0;
	}

	initSong(songs[songIndex]);
	play();
}

buttonNext.addEventListener("click", () => {
	next()
})

function prev() {
	songIndex--;
	if(songIndex < 0) {
		songIndex = songs.length - 1;
	}

	initSong(songs[songIndex]);
	play()
}

buttonPrev.addEventListener("click", () => {
	prev()
})

// Прогресс трека
function progress(event) {
	// через деструкторизацию достаем длительность и текущее время трека
	const {duration, currentTime} = event.srcElement;

	const progressTime = (currentTime / duration) * 100;
	progressLine.style.width = `${progressTime}%`

	timeDuration.textContent = `${timeSong[songIndex]}`;

	timeCurrent.textContent = `0:0${Math.round(currentTime)}`;

	if (Number(Math.round(currentTime)) > 9) {
		timeCurrent.textContent = `0:${Math.round(currentTime)}`;
	}

	if (Number(Math.round(currentTime)) > 59) {
		timeCurrent.textContent = `1:0${Math.round(currentTime) - 60}`;
	}

	if (Number(Math.round(currentTime)) > 69) {
		timeCurrent.textContent = `1:${Math.round(currentTime) - 60}`;
	}

	if (Number(Math.round(currentTime)) > 119) {
		timeCurrent.textContent = `2:0${Math.round(currentTime) - 120}`;
	}

	if (Number(Math.round(currentTime)) > 129) {
		timeCurrent.textContent = `2:${Math.round(currentTime) - 120}`;
	}

	if (Number(Math.round(currentTime)) > 179) {
		timeCurrent.textContent = `3:0${Math.round(currentTime) - 180}`;
	}

	if (Number(Math.round(currentTime)) > 189) {
		timeCurrent.textContent = `3:${Math.round(currentTime) - 180}`;
	}
}

audio.addEventListener('timeupdate', progress);

// Перемотка прогресса
function setProgress (event) {
	// достаем ширину контейнера
	const widthProgress = this.clientWidth;
	// вычисляем координаты где мы кликнули
	const clickX = event.offsetX;
	// достаем опять длину трека
	const duration = audio.duration;
	audio.currentTime = (clickX / widthProgress) * duration;

}

progressContainer.addEventListener("click", setProgress);

// Автоматическое проигрывание треков
audio.addEventListener('ended', next);
