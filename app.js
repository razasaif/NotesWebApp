// console.log('Welcome to Notes taking App .Thank You!');
showNotes();

// If user adds a note, add it to the loaclStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    noteObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addTxt.value = "";
    // console.log(noteObj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null)
        noteObj = [];
    else
        noteObj = JSON.parse(notes);
    let html = "";
    noteObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card " style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text">${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });
    let notesElem = document.getElementById("notes");
    if (noteObj.length != 0)
        notesElem.innerHTML = html;
    else
        notesElem.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
}

// Writing a function which will delete notes
function deleteNote(index) {
    // console.log("I am deleting ", index);
    let notes = localStorage.getItem("notes");
    if (notes == null)
        noteObj = [];
    else
        noteObj = JSON.parse(notes);

    noteObj.splice(index, 1); // Removing the note at given index
    localStorage.setItem("notes", JSON.stringify(noteObj)); // Updating the localStorage
    showNotes();
}

// Searching a note
let search = document.getElementById('searchText');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log("Input event fired", inputVal);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })
})