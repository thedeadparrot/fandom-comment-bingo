function random_range(lower, upper) {
	return lower + Math.floor((upper - lower) * Math.random());
}

function extract_random_element(array_) {
	index = random_range(0, array_.length);
	return array_.splice(index, 1)[0];
}

var VERSION = "v2";
// FEET is in index 80 in the trope array.
var FEET = 80;

function saveState(state) {
	localStorage.setItem(VERSION, JSON.stringify(state));
}

function loadState() {
	state = localStorage.getItem(VERSION);
	if (state) {
		state = JSON.parse(state);
	}
	return state;
}

// Creates a brand new board.
function generateNewBoard(cells, state) {
		tropes = [];
		trope_indexes = [];
		all_tropes.forEach(function (_, i) {
			trope_indexes.push(i);
		});
		// 1 in 100,000 chance of getting an all FEET board.
		isFeet = random_range(0, 100000) == 0;
		for (var i = 0; i < cells.length; i++) {
			// Randomize content
			tropes.push(isFeet? FEET : extract_random_element(trope_indexes));
		}
		state = {
			"tropes": tropes,
			"checked": [],
			"notes": [],
		}
		saveState(state);
		return state;
}

function setUpNotesFeatureToggle() {
	const styleEl = document.getElementsByTagName("style")[0];
	const styleSheet = styleEl.sheet;
	const notesToggleButton = document.getElementById("notes-toggle");
	notesToggleButton.addEventListener("click", function (event) {
		if(notesToggleButton.textContent == "ON") {
			styleSheet.insertRule(".notes, .notes-dump {display: none;}", 0);
			notesToggleButton.textContent = "OFF";
		}
		else {
			styleSheet.deleteRule(0);
			notesToggleButton.textContent = "ON";
		}
	});
}

function populateSummary(state, cells){
	const details = document.getElementById("summary-text");
	var summary = state.notes.reduce(function (curString, note, i) {
		if(note && note.url && state.checked[i]) {
			var squareName = cells[i].getElementsByClassName('square-button')[0].textContent;
			var url = note.url;
			var notes = note.notes;
			return curString + `${squareName} - ${url} - ${notes}\n`;
		}
		return curString;
	}, "");
	details.value = summary;
}

onLoad = function() {
	//Get stylesheet for document.

	cells = document.querySelectorAll(".bingo-square");
	var state = loadState();
	// Load and store state in local storage
	if (!state) {
		state = generateNewBoard(cells, state);
	}
	else {
		for (var i = 0; i < cells.length; i++) {
			if (state.checked[i]) {
				cells[i].classList.add("checked");
			}
		}
	}

	setUpNotesFeatureToggle();

	// Bootstrap notes for backwards compatibility.
	if(!state.hasOwnProperty('notes')){
		state.notes = [];
	}

	state.tropes.forEach(function(_, i) {
		// Make an exception for the center box.
		var bingoButton = cells[i].getElementsByClassName("square-button")[0];
		if(i == 12) {
			bingoButton.innerHTML = "FREE SPACE<br />(any work qualifies)";
		}
		else {
			bingoButton.textContent = all_tropes[state.tropes[i]];
		}
		// Set up click listener to toggle "checked" class on target element
		bingoButton.addEventListener("click", function (event) {
			event.currentTarget.parentElement.classList.toggle("checked");
			state.checked[i] = event.currentTarget.parentElement.classList.contains("checked");
			populateSummary(state, cells);
			saveState(state);
		});

		//Set up click listener for dialog modal.
		var notesButton = cells[i].getElementsByClassName("notes")[0];
		notesButton.addEventListener("click", function(event) {
			var dialog = document.getElementById("notes-dialog");
			// Only try to access the state if we have enough elements in the array.
			var notesState = state.notes.length > i ? state.notes[i] : null;
			var urlNode = document.getElementById("url");
			var notesTextNode = document.getElementById("notes-textarea");
			// Load in notes if we have them.
			if (notesState != null) {
				urlNode.value = notesState.url;
				notesTextNode.value = notesState.notes;
			}
			// Otherwise, set them to blank.
			else {
				urlNode.value = "";
				notesTextNode.value = "";
			}
			dialog.showModal();
			var closeButton = dialog.getElementsByClassName("save-and-close")[0];
			// Set the behavior for the modal to save the contents for the notes fields.
			function saveAndClose(innerEvent) {
				dialog.close();
				var url = urlNode.value;
				var notesText = notesTextNode.value;
				state.notes[i] = {'url': url, 'notes': notesText};
				saveState(state);
				populateSummary(state, cells);
				// Clears out itself, so we don't add multiple event listeners to the button.
				closeButton.removeEventListener("click", saveAndClose);
			}

			closeButton.addEventListener("click", saveAndClose);

			// Set up go to button.
			dialog.getElementsByClassName("go-to-url")[0].addEventListener("click", function(innerEvent){
				var url = urlNode.value;
				window.open(url, "BingoURLTab");
			});
		});

	});

	populateSummary(state, cells);

	const resetButtons = document.querySelectorAll(".reset");
	resetButtons.forEach(function (button) {
		button.addEventListener("click", function(event) {
			localStorage.clear();
			location.reload();
		});
	});
};

document.addEventListener("DOMContentLoaded", onLoad, false);

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
	"female-centred fic",
	"female POV",
	"fic that passes the sexy lamp test",
	"only female POV",
	"fic last updated before july 2024",
	"fic last updated before august 2024",
	"fic last updated before may 2024",
	"fic last updated over two months ago",
	"fic last updated over three months ago",
	"fic last updated over four months ago",
	"fic last updated over five months ago",
	"fic posted over a month ago with ＜1 comment (before you)",
	"fic posted over a month ago with ＜2 comments (before you)",
	"fic posted over a month ago with ＜3 comments (before you)",
	"fic posted over a month ago with ＜4 comments (before you)",
	"fic posted over a month ago with ＜5 comments (before you)",
	"fic posted over a month ago with ＜6 comments (before you)",
	"fic posted over a month ago with ＜7 comments (before you)",
	"fic posted over a month ago with ＜8 comments (before you)",
	"fic posted over a month ago with ＜9 comments (before you)",
	"fic posted over two months ago with ＜1 comment (before you)",
	"fic posted over two months ago with ＜2 comments (before you)",
	"fic posted over two months ago with ＜3 comments (before you)",
	"fic posted over two months ago with ＜4 comments (before you)",
	"fic posted over two months ago with ＜5 comments (before you)",
	"fic posted over two months ago with ＜6 comments (before you)",
	"fic posted over two months ago with ＜7 comments (before you)",
	"fic posted over two months ago with ＜8 comments (before you)",
	"fic posted over two months ago with ＜9 comments (before you)",
	"fic posted over six months ago with ＜1 comment (before you)",
	"fic posted over six months ago with ＜2 comments (before you)",
	"fic posted over six months ago with ＜3 comments (before you)",
	"fic posted over six months ago with ＜4 comments (before you)",
	"fic posted over six months ago with ＜5 comments (before you)",
	"someone wears a gilet",
	"sock length mentioned",
	"UCI regulations mentioned",
	"someone clips (or unclips) from their pedals",
	"someone goes on a training ride where they don’t live",
	"shaved legs",
]
