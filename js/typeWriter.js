
let i = 0;
let text1 = "Putri Luthfiani Suryana S. Kom.";
let text2 = "Today is your Big Day!"
let speed = 100;
let marqueeInitialized = false;

function typeWriter(text, para){
	if(ok == 2){
		clearInterval(typeInterval);
	}
	if(i < text.length){
		document.getElementById(para).innerHTML += text.charAt(i);
		i++;
		speed = Math.random() * 50 + 100;
	}
	else{
		if(ok == 0){
			i = 0;
		}
		ok += 1;
		if(ok === 2){
			handleTypewriterComplete();
		}
	}
}

var typeInterval;

//window.onload = function() {
//	window.onload = function(){};
   	typeInterval = setInterval(function(){
		if(ok == 0){
			typeWriter(text1, "txt1");
		}
		else if(ok == 1){
			typeWriter(text2, "txt2");
		}
	}, 100);
//};

function handleTypewriterComplete(){
	const typeDiv = document.getElementById("typeDiv");
	const marquee = document.getElementById("photoMarquee");
	if(typeDiv){
		typeDiv.classList.add("move-up");
	}
	if(marquee && !marqueeInitialized){
		initPhotoMarquee(marquee);
		marqueeInitialized = true;
	}
	if(marquee){
		marquee.classList.add("active");
		// Geser Happy Graduation ke atas setelah foto muncul
		setTimeout(() => {
			const content = document.getElementById("content");
			if(content){
				content.classList.add("move-up-after-photos");
			}
		}, 500);
		
		// Tampilkan love button setelah foto muncul
		setTimeout(() => {
			const loveButtonContainer = document.getElementById("loveButtonContainer");
			if(loveButtonContainer){
				loveButtonContainer.classList.add("active");
			}
		}, 800);
	}
	
	// Ganti teks "Today is the Big Day." menjadi "Enjoy your moment" setelah delay
	setTimeout(() => {
		const txt2 = document.getElementById("txt2");
		if(txt2){
			txt2.textContent = "";
			const newText = "Enjoy your moment ;)";
			let charIndex = 0;
			const replaceInterval = setInterval(() => {
				if(charIndex < newText.length){
					txt2.textContent += newText.charAt(charIndex);
					charIndex++;
				} else {
					clearInterval(replaceInterval);
				}
			}, 80);
		}
	}, 1500);
}

function initPhotoMarquee(container){
	const tracks = container.querySelectorAll(".marquee-track");
	if(!tracks.length){
		return;
	}
	const sources = (window.imageArray && window.imageArray.length) ? window.imageArray : ["pic/pic1.png"];
	tracks.forEach((track, index) => {
		const offset = (index * Math.ceil(sources.length / tracks.length)) % sources.length;
		const rotated = sources.slice(offset).concat(sources.slice(0, offset));
		const rowSequence = rotated.concat(rotated);
		rowSequence.forEach((src, imgIndex) => {
			const img = document.createElement("img");
			img.src = src;
			img.alt = "Graduation moment";
			const originalIndex = sources.indexOf(src);
			if(originalIndex !== -1){
				img.dataset.photoIndex = originalIndex;
			} else {
				img.dataset.photoIndex = 0;
			}
			
			img.style.pointerEvents = 'auto';
			
			img.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				const photoIndex = parseInt(this.dataset.photoIndex);
				if(!isNaN(photoIndex) && photoIndex >= 0 && window.openPhotoDetail){
					window.openPhotoDetail(photoIndex);
				}
			});
			
			img.addEventListener('mousedown', function(e) {
				e.preventDefault();
			});
			
			track.appendChild(img);
		});
	});
}

let currentPhotoIndex = 0;

window.openPhotoDetail = function(index){
	currentPhotoIndex = index;
	const modal = document.getElementById('photoDetailModal');
	const content = document.getElementById('photoDetailContent');
	const leftCol = document.getElementById('photoDetailLeft');
	const rightCol = document.getElementById('photoDetailRight');
	const img = document.getElementById('photoDetailImage');
	const desc = document.getElementById('photoDetailDescription');
	const counter = document.getElementById('photoDetailCounter');
	const nav = document.getElementById('photoDetailNav');
	const closeBtn = document.getElementById('photoDetailClose');
	
	if(!modal || !img || !desc || !window.imageArray || !window.txtArray){
		return;
	}
	
	// Pastikan modal tidak memiliki class active dulu
	modal.classList.remove('active');
	
	// Reset semua inline styles agar animasi bisa jalan
	if(content){
		content.style.opacity = '';
		content.style.transform = '';
		content.style.transition = '';
	}
	if(leftCol){
		leftCol.style.opacity = '';
		leftCol.style.transform = '';
		leftCol.style.transition = '';
	}
	if(rightCol){
		rightCol.style.opacity = '';
		rightCol.style.transform = '';
		rightCol.style.transition = '';
	}
	if(img){
		img.style.opacity = '';
		img.style.transform = '';
		img.style.transition = '';
	}
	if(desc){
		desc.style.opacity = '';
		desc.style.transform = '';
		desc.style.transition = '';
	}
	if(nav){
		nav.style.opacity = '';
		nav.style.transform = '';
		nav.style.transition = '';
	}
	if(closeBtn){
		closeBtn.style.opacity = '';
		closeBtn.style.transform = '';
		closeBtn.style.transition = '';
	}
	
	// Set konten baru
	img.src = window.imageArray[index];
	desc.textContent = window.txtArray[index] || '';
	counter.textContent = `${index + 1} / ${window.imageArray.length}`;
	
	// Force reflow untuk memastikan reset diterapkan
	setTimeout(() => {
		// Tambahkan class active untuk trigger animasi
		modal.classList.add('active');
		updateNavButtons();
		// Mulai efek shooting stars
		startShootingStars(modal);
	}, 10);
}

function startShootingStars(modal) {
	// Determine which stars container to use based on modal
	let starsContainer;
	if(modal.id === 'letterModal'){
		starsContainer = document.getElementById('letterModalStars');
	} else {
		starsContainer = document.getElementById('photoDetailStars');
	}
	
	if(!starsContainer){
		return;
	}
	
	// Clear existing stars
	starsContainer.innerHTML = '';
	
	// Buat beberapa shooting stars dengan delay berbeda
	for(let i = 0; i < 5; i++){
		setTimeout(() => {
			createShootingStar(starsContainer, modal);
		}, i * 800 + Math.random() * 500);
	}
	
	// Continue creating stars periodically
	let starInterval = setInterval(() => {
		if(!modal.classList.contains('active')){
			clearInterval(starInterval);
			return;
		}
		createShootingStar(starsContainer, modal);
	}, 2000 + Math.random() * 2000);
	
	// Store interval so we can clear it later
	modal._starInterval = starInterval;
}

function createShootingStar(container, modal) {
	if(!modal || !modal.classList.contains('active')){
		return;
	}
	
	const star = document.createElement('div');
	star.className = 'shooting-star';
	
	// Random start position (top area, bisa dari kiri atau atas)
	const startX = -100 + Math.random() * (window.innerWidth * 0.3);
	const startY = -50 + Math.random() * (window.innerHeight * 0.3);
	
	// Random end position (bottom-right area) 
	const endX = window.innerWidth + 200;
	const endY = window.innerHeight + 200;
	
	// Calculate distance and angle
	const deltaX = endX - startX;
	const deltaY = endY - startY;
	const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
	
	// Random duration (1.5s to 3s)
	const duration = 1.5 + Math.random() * 1.5;
	
	// Set CSS variables for animation
	star.style.left = startX + 'px';
	star.style.top = startY + 'px';
	star.style.setProperty('--end-x', deltaX + 'px');
	star.style.setProperty('--end-y', deltaY + 'px');
	star.style.setProperty('--angle', angle + 'deg');
	star.style.setProperty('--duration', duration + 's');
	
	container.appendChild(star);
	
	// Remove star after animation
	setTimeout(() => {
		if(star.parentNode){
			star.parentNode.removeChild(star);
		}
	}, duration * 1000 + 200);
}

window.closePhotoDetail = function(){
	const modal = document.getElementById('photoDetailModal');
	const content = document.getElementById('photoDetailContent');
	const img = document.getElementById('photoDetailImage');
	const desc = document.getElementById('photoDetailDescription');
	const nav = document.getElementById('photoDetailNav');
	const closeBtn = document.getElementById('photoDetailClose');
	
	if(modal && content){
		// Fade out content first
		if(content){
			content.style.opacity = '0';
			content.style.transform = 'scale(0.9) translateY(20px)';
		}
		if(img){
			img.style.opacity = '0';
			img.style.transform = 'scale(0.95)';
		}
		if(desc){
			desc.style.opacity = '0';
			desc.style.transform = 'translateX(20px)';
		}
		if(nav){
			nav.style.opacity = '0';
			nav.style.transform = 'translateY(10px)';
		}
		if(closeBtn){
			closeBtn.style.opacity = '0';
			closeBtn.style.transform = 'scale(0.8) rotate(90deg)';
		}
		
		// Stop shooting stars
		if(modal._starInterval){
			clearInterval(modal._starInterval);
			modal._starInterval = null;
		}
		const starsContainer = document.getElementById('photoDetailStars');
		if(starsContainer){
			starsContainer.innerHTML = '';
		}
		
		// Then fade out modal background
		setTimeout(() => {
			modal.classList.remove('active');
			// Reset semua inline styles setelah animasi selesai
			setTimeout(() => {
				if(content) {
					content.style.opacity = '';
					content.style.transform = '';
				}
				if(img) {
					img.style.opacity = '';
					img.style.transform = '';
				}
				if(desc) {
					desc.style.opacity = '';
					desc.style.transform = '';
				}
				if(nav) {
					nav.style.opacity = '';
					nav.style.transform = '';
				}
				if(closeBtn) {
					closeBtn.style.opacity = '';
					closeBtn.style.transform = '';
				}
			}, 100);
		}, 300);
	}
}

window.navigatePhoto = function(direction){
	if(!window.imageArray || !window.imageArray.length){
		return;
	}
	
	const img = document.getElementById('photoDetailImage');
	const desc = document.getElementById('photoDetailDescription');
	const counter = document.getElementById('photoDetailCounter');
	
	if(!img || !desc || !counter){
		return;
	}
	
	// Fade out current content
	img.style.opacity = '0';
	img.style.transform = 'scale(0.95)';
	desc.style.opacity = '0';
	desc.style.transform = 'translateX(20px)';
	
	setTimeout(() => {
		if(direction === 'next'){
			currentPhotoIndex = (currentPhotoIndex + 1) % window.imageArray.length;
		} else if(direction === 'prev'){
			currentPhotoIndex = (currentPhotoIndex - 1 + window.imageArray.length) % window.imageArray.length;
		}
		
		img.src = window.imageArray[currentPhotoIndex];
		desc.textContent = window.txtArray[currentPhotoIndex] || '';
		counter.textContent = `${currentPhotoIndex + 1} / ${window.imageArray.length}`;
		
		// Force reflow to restart animation
		void img.offsetWidth;
		void desc.offsetWidth;
		
		// Fade in new content
		img.style.opacity = '1';
		img.style.transform = 'scale(1)';
		desc.style.opacity = '1';
		desc.style.transform = 'translateX(0)';
		
		updateNavButtons();
	}, 200);
}

function updateNavButtons(){
	const prevBtn = document.getElementById('photoPrevBtn');
	const nextBtn = document.getElementById('photoNextBtn');
	
	if(prevBtn && nextBtn && window.imageArray){
		prevBtn.disabled = false;
		nextBtn.disabled = false;
	}
}

// Letter content (hardcoded - nanti bisa diganti)
const letterContent = `Kepada Yts (yang tersayang)
Ibu Putri Luthfiani Suryana S. Kom.✧

Dengan hormat,
Selamat yaaa sayang kamu udah berhasil menamatkan game kehidupan level beginner iniii. intinya hebattt lah kamuu aku banggaa sekali ദ്ദി ༎ຶ‿༎ຶ ). Terus semangat yaaa setelah ini menjalani game kehidupan level selanjutnya yaitu expert wkwkwk. Walau semakin sulit dijalani semoga akan terasa mudah karena mulai sekarang kamu menjalani hidup kamu sama aku (aamiin). Cuma ini aja sih maaf ya gabisa ngasih lebihh;) udah terimakasssih sayang Love You 💖

Hormat saya,
lovꫀ you .ᐟ
Aryadipura`;

window.openLetterModal = function(){
	const letterModal = document.getElementById('letterModal');
	const letterText = document.getElementById('letterText');
	const letterStars = document.getElementById('letterModalStars');
	
	if(!letterModal || !letterText){
		return;
	}
	
	// Reset modal
	letterModal.classList.remove('active');
	letterText.style.opacity = '';
	letterText.style.transform = '';
	if(letterStars){
		letterStars.innerHTML = '';
	}
	
	// Set content
	letterText.textContent = letterContent;
	
	// Force reflow
	setTimeout(() => {
		letterModal.classList.add('active');
		// Mulai efek shooting stars untuk modal surat
		if(letterModal.classList.contains('active')){
			startShootingStars(letterModal);
		}
	}, 10);
}

window.closeLetterModal = function(){
	const letterModal = document.getElementById('letterModal');
	const letterContent = document.getElementById('letterContent');
	const letterText = document.getElementById('letterText');
	const letterStars = document.getElementById('letterModalStars');
	const letterClose = document.getElementById('letterClose');
	
	if(letterModal && letterContent){
		// Fade out content
		if(letterContent){
			letterContent.style.opacity = '0';
			letterContent.style.transform = 'scale(0.9) translateY(20px)';
		}
		if(letterText){
			letterText.style.opacity = '0';
			letterText.style.transform = 'translateY(20px)';
		}
		if(letterClose){
			letterClose.style.opacity = '0';
			letterClose.style.transform = 'scale(0.8) rotate(90deg)';
		}
		
		// Stop shooting stars
		if(letterModal._starInterval){
			clearInterval(letterModal._starInterval);
			letterModal._starInterval = null;
		}
		if(letterStars){
			letterStars.innerHTML = '';
		}
		
		// Then fade out modal background
		setTimeout(() => {
			letterModal.classList.remove('active');
			// Reset styles setelah animasi selesai
			setTimeout(() => {
				if(letterContent) {
					letterContent.style.opacity = '';
					letterContent.style.transform = '';
				}
				if(letterText) {
					letterText.style.opacity = '';
					letterText.style.transform = '';
				}
				if(letterClose) {
					letterClose.style.opacity = '';
					letterClose.style.transform = '';
				}
			}, 100);
		}, 300);
	}
}

window.addEventListener('DOMContentLoaded', function(){
	const closeBtn = document.getElementById('photoDetailClose');
	const prevBtn = document.getElementById('photoPrevBtn');
	const nextBtn = document.getElementById('photoNextBtn');
	const modal = document.getElementById('photoDetailModal');
	const letterCloseBtn = document.getElementById('letterClose');
	const letterModal = document.getElementById('letterModal');
	
	if(closeBtn){
		closeBtn.addEventListener('click', window.closePhotoDetail);
	}
	
	if(prevBtn){
		prevBtn.addEventListener('click', () => window.navigatePhoto('prev'));
	}
	
	if(nextBtn){
		nextBtn.addEventListener('click', () => window.navigatePhoto('next'));
	}
	
	if(modal){
		modal.addEventListener('click', function(e){
			if(e.target === modal){
				window.closePhotoDetail();
			}
		});
	}
	
	if(letterCloseBtn){
		letterCloseBtn.addEventListener('click', window.closeLetterModal);
	}
	
	if(letterModal){
		letterModal.addEventListener('click', function(e){
			if(e.target === letterModal){
				window.closeLetterModal();
			}
		});
	}
	
	document.addEventListener('keydown', function(e){
		const modal = document.getElementById('photoDetailModal');
		const letterModal = document.getElementById('letterModal');
		
		if(modal && modal.classList.contains('active')){
			if(e.key === 'Escape'){
				window.closePhotoDetail();
			} else if(e.key === 'ArrowLeft'){
				window.navigatePhoto('prev');
			} else if(e.key === 'ArrowRight'){
				window.navigatePhoto('next');
			}
		}
		
		if(letterModal && letterModal.classList.contains('active')){
			if(e.key === 'Escape'){
				window.closeLetterModal();
			}
		}
	});
});
