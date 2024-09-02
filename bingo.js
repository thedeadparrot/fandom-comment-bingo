function random_range(lower, upper) {
	return lower + Math.floor((upper - lower) * Math.random());
}

function extract_random_element(array_) {
	index = random_range(0, array_.length);
	return array_.splice(index, 1)[0];
}

var VERSION = "v2";

onLoad = function() {
	cells = document.querySelectorAll("td");

	// Load and store state in local storage
	state = localStorage.getItem(VERSION);
	if (!state) {
		tropes = [];
		trope_indexes = [];
		all_tropes.forEach(function (_, i) {
			trope_indexes.push(i);
		});
		for (var i = 0; i < cells.length; i++) {
			// Randomize content
			tropes.push(extract_random_element(trope_indexes));
		}
		state = {
			"tropes": tropes,
			"checked": []
		}
		localStorage.setItem(VERSION, JSON.stringify(state));
	} else {
		state = JSON.parse(state);
		for (var i = 0; i < cells.length; i++) {
			if (state.checked[i]) {
				cells[i].classList.add("checked");
			}
		}
	}

	state.tropes.forEach(function(_, i) {
		cells[i].textContent = all_tropes[state.tropes[i]];
		// Set up click listener to toggle "checked" class on target element
		cells[i].addEventListener("click", function (event) {
			event.currentTarget.classList.toggle("checked");
			state.checked[i] = event.currentTarget.classList.contains("checked");
			localStorage.setItem(VERSION, JSON.stringify(state));
		});
	});

	const resetButtons = document.querySelectorAll(".reset");
	resetButtons.forEach(function (button) {
		button.addEventListener("click", function(event) {
			localStorage.clear();
			location.reload();
		});
	});
};

document.addEventListener('DOMContentLoaded', onLoad, false);

all_tropes = [
	"On-stage change of clothes",
	"Gimmicky instrument",
	"Key change, truck driver's or otherwise",
	"Rap",
	"Notably bad accent",
	"Wind machine",
	"Platforms on stage",
	"Trying for audience participation",
	"Pyrotechnics and/or confetti",
	"Ethnic influences",
	"References to European community",
	"Implied homosexuality",
	"Band name used in decoration",
	"Odd singing registers (falsetto, tuvan throat singing, yodeling, etc)",
	"Retro-famous dance move",
	"Side step-dance",
	"GLITTER",
	"Tight overall (clothing)",
	"Song is not serious song",
	"Preposterous shoes",
	"Band name with pun",
	"\"Love\" in song title",
	"Eastern-bloc votes for eastern-bloc",
	"Scandinavia votes for Scandinavia",
	"Country sent their best singer to competition",
	"An actual famous band",
	"Technical failure",
	"Technical delay",
	"Boob shock",
	"Vocal microphone effects",
	"Wailing",
	"Balloons",
	"Greeting from artist that was unable to make it",
	"Shoutout/wave to family member in the audience",
	"Overwhelming cringe",
	"Dancers' uniforms do not match artist and/or are irrelevant to song",
	"Artist < 18 years of age",
	"Artist > 18 years of age, acts like < 18",
	"Duet performers with socially unacceptable age span",
	"Unexpected techno segue",
	"Sunglasses",
	"Lasershow",
	"Audience aware of being filmed, points/stares at video screen",
	"Two hands gripping the microphone",
	"Foul language",
	"Facial paint",
	"Parody of real band",
	"Music medley",
	"Host/hostess dancing",
	"Pointing into camera",
	"Microphone between legs",
	"Visible camera",
	"Obvious local audience-pleaser",
	"Performers leaning back-to-back",
	"Smoke machine",
	"Backstage footage",
	"Live outdoors footage",
	"Sepia-filter",
	"Accordion, violin, flute, harmonica or harp",
	"Hand movement 5+ sec",
	"Questionable props",
	"Heavy breathing in microphone",
	"Lyrics other than English or native language",
	"Shocking nudity",
	"Patriotism",
	"Belly button showing",
	"\"Is the UK/France/Germany taking this seriously?\"",
	"Interim entertainment would have easily won",
	"Artist of color",
	"Clicking one's heels",
	"Screaming fans up close",
	"Pun in song title",
	"Reference to ABBA",
	"Sign with name",
	"Comical sign",
	"Peace theme from war nation",
	"Walking in circles around each other",
	"Kissing on stage",
	"Song inappropriate for senior citizens",
	"Siblings on stage",
	"Pornstache",
	"Song sharing a title with one previously performed", //As made famous 2015
	"Disposal of footwear",
	"Preposterous dress",
	"Shocking shoes",
	"Flying",
	"(Dis)apparation",
	"Demonic ritual",
	"Cape",
	"On-stage selfie",
	"Tinfoil hat",
	"Destroying equipment",
	"Winking to camera",
	"Selfie stick used by artist",
	"Person banging on drums", // Thanks Kathi
	"Appearing taller than they really are",
	"Animal costume",
	"Dreads",
	"Artist in tracksuit or acti-leisure wear",
	"Face as decoration",
	"Breakdance",
	"Obviously artificial hair",
	"Multiple performers with same hair dress",
	"Artificial nails",
	"Ostrich feathers",
	"Unicorn in audience",
	"Floor glass crack effect",
	"Good evening Europe!",
	"Good morning Australia!",
	"Latin-inspired from outside the Iberian Peninsula",
	"Voguing",
]
