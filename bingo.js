function random_range(lower, upper) {
	return lower + Math.floor((upper - lower) * Math.random());
}

function extract_random_element(array_) {
	index = random_range(0, array_.length);
	return array_.splice(index, 1)[0];
}

var VERSION = "v2";

onLoad = function() {
	cells = document.querySelectorAll("button");

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
		// Make an exception for the center box.
		if(i == 12) {
			cells[i].innerHTML = 'FREE SPACE<br />(any work qualifies)';
		}
		else {
			cells[i].textContent = all_tropes[state.tropes[i]];
		}
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
	"fic last updated before 2020",
	"fanart",
	"oneshot",
	"drabble (single, double, triple etc.)",
	"fic from an event",
	"kink you haven’t read before",
	"fic last updated before 2021",
	"fic last updated before 2022",
	"fic last updated before 2023",
	"fic last updated before 2024",
	"first chapter of a multichapter",
	"last chapter of a multichapter",
	"chapter that isn’t the first or last of a multichapter",
	"abandoned work",
	"work on hiatus",
	"anonymous work",
	"pairing you haven’t read before",
	"fic you’ve read before but haven’t commented on",
	"fic you’ve read and commented on before",
	"fic in a series",
	"platonic pairing",
	"romantic pairing",
	"rated general audiences",
	"rated teen and up audiences",
	"rated mature",
	"rated explicit",
	"not rated",
	"completed work",
	"incomplete work",
	"category: f/f",
	"category: m/f",
	"category: m/m",
	"category: gen",
	"category: multi",
	"category: other",
	"warnings: choose not to use archive warnings",
	"warnings: one of the archive warnings apply",
	"warnings: not marked with any archive warnings",
	"gen fic",
	"quote a line back to the author",
	"talk about characterization",
	"mention a detail you liked",
	"talk about your emotional reaction",
	"mention a plot point you liked",
	"talk about an insight the fic gave you",
	"compare the fic to another the author wrote",
	"ask a question about the fic",
	"mention something you learnt from the fic you didn’t know before",
	"talk about the themes you thought were in the fic",
	"mention the symbolism in the fic",
	"an author/artist new to you",
	"fic that made you laugh",
	"fic that made you cry (or think about crying)",
	"fic that you would rec to someone else",
	"fic with a rare pairing (<20 works)",
	"fic that takes place in a hotel room",
	"fic with less than two comments (before you)",
	"fic with less than three comments (before you)",
	"fic with less than four comments (before you)",
	"fic with less than five comments (before you)",
	"fic with less than eight comments (before you)",
	"fic with less than ten comments (before you)",
	"fic with less than fourteen comments (before you)",
	"fic with less than twenty comments (before you)",
	"fic with no comments (before you)",
	"fic with less than two comments (before you)",
	"altitude camp",
	"experimental format (epistolary, social media, etc)",
	"fic that introduced you to a new rider",
	"trope you haven't read before",
	"under 1000 words",
	"under 500 words",
	"over 1000 words",
	"features a song you like (lyrics, reference)",
	"someone eats a gel",
	"someone drinks from a bidon",
	"someone gets a puncture",
	"fic that got you into a pairing",
	"fic that you frequently reread",
	"fic that prominently features bodily fluids",
	"FEET",
	"fic with a very rare pairing (<5 works)",
	"fic with an ambiguous ending",
	"discuss the worldbuilding in the fic",
	"alternate universe fic",
	"non-cyclist AU",
	"canon-divergence AU",
	"fic with a tag that made you laugh",
	"fic with your favorite tag",
	"fic with children/childhood",
	"speculative fiction au",
]
