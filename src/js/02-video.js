import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle((data) => {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}, 1000));

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime !== null) {
  player.setCurrentTime(parseFloat(savedTime)).catch(function(error) {
    console.error('Error setting the current time:', error);
  });
}

