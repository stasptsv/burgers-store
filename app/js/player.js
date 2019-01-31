let player;

	function onYouTubeIframeAPIReady() {
		player = new YT.Player('yt-player', {
			width: '660',
			height: '405', 
			videoId: 'zmg_jOwa9Fc',
			playerVars: {
				controls: 0,
				disablekb: 0,
				showinfo: 0,
				rel: 0,
				autoplay: 0,
				modestbranding: 0
			},
			events: {
				onReady: onPlayerReady,
				onStateChange: onPlayerStateChange
			}
		});
	}

	function onPlayerReady(event) {
		const duration = player.getDuration();
		let interval;

		updateTimerDisplay();

		document.querySelector('.player').classList.remove('hidden');
		
		clearInterval(interval);

		interval = setInterval(() => {
			const completed = player.getCurrentTime();
			const percents = (completed / duration) * 10;

			changeButtonPosition(percents);

			// updateTimerDisplay()
		}, 1000);
	}

	function onPlayerStateChange(event) {
		const playerButton = document.querySelector('.player-start')

		switch (event.data) {
			case 1: 
				document.querySelector('.player-wrapper').classList.add('active');
				playerButton.classList.add('paused');
				break;
			case 2:
				playerButton.classList.remove('paused');
				break;
		}
	}

	document.querySelector('.player-start').addEventListener('click', (event) => {
		const playerStatus = player.getPlayerState();

		if (playerStatus !== 1) {
			player.playVideo();
		} else {
			player.pauseVideo();
		}
	});

	document.querySelector('.player-playback').addEventListener('click', (event) => {
		event.preventDefault();

		let bar = event.currentTarget;
		let newButtonPosition = event.pageX - bar.pageXOffset().left;
		let clickedPercents = (newButtonPosition / bar.width()) * 100;
		let newPlayerTime = (player.getDuration() / 100) * clickedPercents;

		changeButtonPosition(clickedPercents);
		player.seekTo(newPlayerTime);
	});

	document.querySelector('.player-splash').addEventListener('click', (event) => {
		player.playVideo();
	});

	function changeButtonPosition(percents) {
		document.querySelector('.player-playback__button').style.left = `${percents}%`;
	}

	function updateTimerDisplay() {
		document.querySelector('.player-duration__completed').append(formatTime(player.getCurrentTime()));
		document.querySelector('.player-duration__estimate').append(formatTime(player.getDuration()));
	}

	function formatTime(time) {
		let roundTime = Math.round(time);
		let minutes = Math.floor(roundTime / 60);
		let seconds = roundTime - minutes * 60;
		let formatedSeconds = seconds < 10 ? `${seconds}` : seconds;

		return minutes + ':' + formatedSeconds;
	}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLm1pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCJwYXRoXCI7XG5cbmxldCBwbGF5ZXI7XG5cblx0ZnVuY3Rpb24gb25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkoKSB7XG5cdFx0cGxheWVyID0gbmV3IFlULlBsYXllcigneXQtcGxheWVyJywge1xuXHRcdFx0d2lkdGg6ICc2NjAnLFxuXHRcdFx0aGVpZ2h0OiAnNDA1JywgXG5cdFx0XHR2aWRlb0lkOiAnem1nX2pPd2E5RmMnLFxuXHRcdFx0cGxheWVyVmFyczoge1xuXHRcdFx0XHRjb250cm9sczogMCxcblx0XHRcdFx0ZGlzYWJsZWtiOiAwLFxuXHRcdFx0XHRzaG93aW5mbzogMCxcblx0XHRcdFx0cmVsOiAwLFxuXHRcdFx0XHRhdXRvcGxheTogMCxcblx0XHRcdFx0bW9kZXN0YnJhbmRpbmc6IDBcblx0XHRcdH0sXG5cdFx0XHRldmVudHM6IHtcblx0XHRcdFx0b25SZWFkeTogb25QbGF5ZXJSZWFkeSxcblx0XHRcdFx0b25TdGF0ZUNoYW5nZTogb25QbGF5ZXJTdGF0ZUNoYW5nZVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gb25QbGF5ZXJSZWFkeShldmVudCkge1xuXHRcdGNvbnN0IGR1cmF0aW9uID0gcGxheWVyLmdldER1cmF0aW9uKCk7XG5cdFx0bGV0IGludGVydmFsO1xuXG5cdFx0dXBkYXRlVGltZXJEaXNwbGF5KCk7XG5cblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdFx0XG5cdFx0Y2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG5cblx0XHRpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblx0XHRcdGNvbnN0IGNvbXBsZXRlZCA9IHBsYXllci5nZXRDdXJyZW50VGltZSgpO1xuXHRcdFx0Y29uc3QgcGVyY2VudHMgPSAoY29tcGxldGVkIC8gZHVyYXRpb24pICogMTAwO1xuXG5cdFx0XHRjaGFuZ2VCdXR0b25Qb3NpdGlvbihwZXJjZW50cyk7XG5cblx0XHRcdHVwZGF0ZVRpbWVyRGlzcGxheSgpXG5cdFx0fSwgMTAwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBvblBsYXllclN0YXRlQ2hhbmdlKGV2ZW50KSB7XG5cdFx0Y29uc3QgcGxheWVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1zdGFydCcpXG5cblx0XHRzd2l0Y2ggKGV2ZW50LmRhdGEpIHtcblx0XHRcdGNhc2UgMTogXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItd3JhcHBlcicpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdFx0XHRwbGF5ZXJCdXR0b24uY2xhc3NMaXN0LmFkZCgncGF1c2VkJyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRwbGF5ZXJCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2VkJyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BsYXllci1zdGFydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG5cdFx0Y29uc3QgcGxheWVyU3RhdHVzID0gcGxheWVyLmdldFBsYXllclN0YXRlKCk7XG5cblx0XHRpZiAocGxheWVyU3RhdHVzICE9PSAxKSB7XG5cdFx0XHRwbGF5ZXIucGxheVZpZGVvKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBsYXllci5wYXVzZVZpZGVvKCk7XG5cdFx0fVxuXHR9KTtcblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXBsYXliYWNrJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0bGV0IGJhciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cdFx0bGV0IG5ld0J1dHRvblBvc2l0aW9uID0gZXZlbnQucGFnZVggLSBiYXIub2Zmc2V0KCkubGVmdDtcblx0XHRsZXQgY2xpY2tlZFBlcmNlbnRzID0gKG5ld0J1dHRvblBvc2l0aW9uIC8gYmFyLndpZHRoKCkpICogMTAwO1xuXHRcdGxldCBuZXdQbGF5ZXJUaW1lID0gKHBsYXllci5nZXREdXJhdGlvbigpIC8gMTAwKSAqIGNsaWNrZWRQZXJjZW50cztcblxuXHRcdGNoYW5nZUJ1dHRvblBvc2l0aW9uKGNsaWNrZWRQZXJjZW50cyk7XG5cdFx0cGxheWVyLnNlZWtUbyhuZXdQbGF5ZXJUaW1lKTtcblx0fSk7XG5cblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1zcGxhc2gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuXHRcdHBsYXllci5wbGF5VmlkZW8oKTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gY2hhbmdlQnV0dG9uUG9zaXRpb24ocGVyY2VudHMpIHtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXBsYXliYWNrX19idXR0b24nKS5zdHlsZS5sZWZ0ID0gYCR7cGVyY2VudHN9JWA7XG5cdH1cblxuXHRmdW5jdGlvbiB1cGRhdGVUaW1lckRpc3BsYXkoKSB7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1kdXJhdGlvbl9fY29tcGxldGVkJykudGV4dENvbnRlbnQoZm9ybWF0VGltZShwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSkpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItZHVyYXRpb25fX2VzdGltYXRlJykudGV4dENvbnRlbnQoZm9ybWF0VGltZShwbGF5ZXIuZ2V0RHVyYXRpb24oKSkpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZm9ybWF0VGltZSh0aW1lKSB7XG5cdFx0bGV0IHJvdW5kVGltZSA9IE1hdGgucm91bmQodGltZSk7XG5cdFx0bGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHJvdW5kVGltZSAvIDYwKTtcblx0XHRsZXQgc2Vjb25kcyA9IHJvdW5kVGltZSAtIG1pbnV0ZXMgKiA2MDtcblx0XHRsZXQgZm9ybWF0ZWRTZWNvbmRzID0gc2Vjb25kcyA8IDEwID8gYDAke3NlY29uZHN9YCA6IHNlY29uZHM7XG5cblx0XHRyZXR1cm4gbWludXRlcyArICc6JyArIGZvcm1hdGVkU2Vjb25kcztcblx0fSJdfQ==
