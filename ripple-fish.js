// Fish, shark, and whale animation for underwater background
window.addEventListener('DOMContentLoaded', function() {
	const fishCount = 7;
	const sharkCount = 2;
	const whaleCount = 1;
	const fishSVG = '<svg class="fish-bg" width="40" height="20" viewBox="0 0 40 20" style="transform: scaleX(-1);"><ellipse cx="15" cy="10" rx="12" ry="6" fill="#223"/><polygon points="27,10 40,3 40,17" fill="#223"/></svg>';
	const sharkSVG = '<svg class="fish-bg" width="60" height="24" viewBox="0 0 60 24" style="transform: scaleX(-1);"><ellipse cx="25" cy="12" rx="20" ry="8" fill="#223"/><polygon points="45,12 60,2 60,22" fill="#223"/><polygon points="10,12 0,6 0,18" fill="#223"/></svg>';
	const whaleSVG = '<svg class="fish-bg" width="120" height="40" viewBox="0 0 120 40" style="transform: scaleX(-1);"><ellipse cx="60" cy="20" rx="50" ry="16" fill="#223"/><polygon points="110,20 120,10 120,30" fill="#223"/><polygon points="20,20 0,10 0,30" fill="#223"/></svg>';

	let fishElems = [], fishDepths = [], positions = [], baseHeights = [];
	let sharkElems = [], sharkDepths = [], sharkPositions = [], sharkBaseHeights = [];
	let whaleElem, whaleDepth, whalePosition, whaleBaseHeight;
	const verticalSpace = window.innerHeight - 100;
	// Fish
	for (let i = 0; i < fishCount; i++) {
		let fish = document.createElement('div');
		fish.innerHTML = fishSVG;
		fish.style.position = 'absolute';
		fish.style.zIndex = '0';
		fish.style.pointerEvents = 'none';
		let depth = Math.random() * 0.7 + 0.5;
		fish.style.transform = `scale(${depth})`;
		fish.style.opacity = (0.3 + 0.4 * depth).toString();
		fish.style.width = '40px';
		fish.style.height = '20px';
		fish.style.overflow = 'hidden';
		document.body.appendChild(fish);
		fishElems.push(fish);
		fishDepths.push(depth);
		positions.push(Math.random() * window.innerWidth * 0.8 - 40);
		baseHeights.push(60 + (verticalSpace/(fishCount+1))*(i+1) + (Math.random()-0.5)*30);
	}
	// Sharks
	for (let i = 0; i < sharkCount; i++) {
		let shark = document.createElement('div');
		shark.innerHTML = sharkSVG;
		shark.style.position = 'absolute';
		shark.style.zIndex = '0';
		shark.style.pointerEvents = 'none';
		let depth = Math.random() * 0.5 + 0.8;
		shark.style.transform = `scale(${depth})`;
		shark.style.opacity = (0.25 + 0.3 * depth).toString();
		shark.style.width = '60px';
		shark.style.height = '24px';
		shark.style.overflow = 'hidden';
		document.body.appendChild(shark);
		sharkElems.push(shark);
		sharkDepths.push(depth);
		sharkPositions.push(Math.random() * window.innerWidth * 0.8 - 60);
		sharkBaseHeights.push(120 + (verticalSpace/(sharkCount+2))*(i+1) + (Math.random()-0.5)*40);
	}
	// Whale
	whaleElem = document.createElement('div');
	whaleElem.innerHTML = whaleSVG;
	whaleElem.style.position = 'absolute';
	whaleElem.style.zIndex = '0';
	whaleElem.style.pointerEvents = 'none';
	whaleDepth = 1.2;
	whaleElem.style.transform = `scale(${whaleDepth})`;
	whaleElem.style.opacity = '0.18';
	whaleElem.style.width = '120px';
	whaleElem.style.height = '40px';
	whaleElem.style.overflow = 'hidden';
	document.body.appendChild(whaleElem);
	whalePosition = Math.random() * window.innerWidth * 0.8 - 120;
	whaleBaseHeight = window.innerHeight - 120;

		// Helper: check if fish is behind hero card
			function isInFrontOfHero(left, top, width, height) {
				const hero = document.querySelector('.hero-card');
				if (!hero) return false;
				const rect = hero.getBoundingClientRect();
				return (
					left + width > rect.left && left < rect.right &&
					top + height > rect.top && top < rect.bottom
				);
			}

		function swimAll() {
			// Fish
			for (let i = 0; i < fishCount; i++) {
				positions[i] += (1.2 + i*0.3) * fishDepths[i];
				if (positions[i] > window.innerWidth + 40) positions[i] = -40 - Math.random()*120;
				let top = baseHeights[i] + Math.sin(positions[i]/120 + i)*6;
				fishElems[i].style.left = positions[i] + 'px';
				fishElems[i].style.top = top + 'px';
				// Check if fish is behind hero card
				let fishRect = {left: positions[i], top: top, width: 40, height: 20};
						if (isInFrontOfHero(fishRect.left, fishRect.top, fishRect.width, fishRect.height)) {
							fishElems[i].style.opacity = '0.85';
						} else {
							if (positions[i] > window.innerWidth - 120 && positions[i] <= window.innerWidth - 20) {
								let fade = 1 - ((positions[i] - (window.innerWidth - 120)) / 100);
								fishElems[i].style.opacity = (0.3 + 0.4 * fishDepths[i]) * fade;
							} else {
								fishElems[i].style.opacity = (0.3 + 0.4 * fishDepths[i]).toString();
							}
						}
				fishElems[i].style.display = (positions[i] < -40 || positions[i] > window.innerWidth - 20) ? 'none' : 'block';
			}
			// Sharks
					for (let i = 0; i < sharkCount; i++) {
						sharkPositions[i] += (1.7 + i*0.4) * sharkDepths[i];
						if (sharkPositions[i] > window.innerWidth + 60) sharkPositions[i] = -60 - Math.random()*180;
						let top = sharkBaseHeights[i] + Math.sin(sharkPositions[i]/160 + i)*10;
						sharkElems[i].style.left = sharkPositions[i] + 'px';
						sharkElems[i].style.top = top + 'px';
						let sharkRect = {left: sharkPositions[i], top: top, width: 60, height: 24};
						if (isInFrontOfHero(sharkRect.left, sharkRect.top, sharkRect.width, sharkRect.height)) {
							sharkElems[i].style.opacity = '0.85';
						} else {
							if (sharkPositions[i] > window.innerWidth - 180 && sharkPositions[i] <= window.innerWidth - 40) {
								let fade = 1 - ((sharkPositions[i] - (window.innerWidth - 180)) / 140);
								sharkElems[i].style.opacity = (0.25 + 0.3 * sharkDepths[i]) * fade;
							} else {
								sharkElems[i].style.opacity = (0.25 + 0.3 * sharkDepths[i]).toString();
							}
						}
						sharkElems[i].style.display = (sharkPositions[i] < -60 || sharkPositions[i] > window.innerWidth - 40) ? 'none' : 'block';
					}
			// Whale
			whalePosition += 1.1 * whaleDepth;
			if (whalePosition > window.innerWidth + 120) whalePosition = -120 - Math.random()*300;
			let whaleTop = whaleBaseHeight + Math.sin(whalePosition/200)*18;
			whaleElem.style.left = whalePosition + 'px';
			whaleElem.style.top = whaleTop + 'px';
			let whaleRect = {left: whalePosition, top: whaleTop, width: 120, height: 40};
				if (isInFrontOfHero(whaleRect.left, whaleRect.top, whaleRect.width, whaleRect.height)) {
					whaleElem.style.opacity = '0.85';
				} else {
					if (whalePosition > window.innerWidth - 300 && whalePosition <= window.innerWidth - 60) {
						let fade = 1 - ((whalePosition - (window.innerWidth - 300)) / 240);
						whaleElem.style.opacity = 0.18 * fade;
					} else {
						whaleElem.style.opacity = '0.18';
					}
				}
			whaleElem.style.display = (whalePosition < -120 || whalePosition > window.innerWidth - 60) ? 'none' : 'block';
			requestAnimationFrame(swimAll);
		}
		swimAll();
});
