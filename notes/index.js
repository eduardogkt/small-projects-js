document.addEventListener("DOMContentLoaded", function() {

lucide.createIcons();

const addNoteBtn = document.querySelector("#add-note-btn");

addNoteBtn.addEventListener("click", addInputBox);

function addInputBox() {
    const form = document.createElement("form");
    form.id = "note-input";
    form.classList.add("note-input");
    form.innerHTML = `
        <textarea 
            name="note-input" 
            class="text-input" 
            id="text-input" 
            maxlength="1000" 
            rows="3" 
            placeholder="write a note..."></textarea>
        <div class="btns">
            <button class="btn create-btn" role="submit" id="create-btn">
                <i data-lucide="arrow-right" class="icon"></i>
            </button>
        </div>
    `;
    form.addEventListener("submit", event => event.preventDefault());
    
    document.querySelector(".wrapper").insertBefore(form, addNoteBtn);
    addNoteBtn.classList.toggle("hide");

    // document.querySelector("#cancel-btn").addEventListener("click", cancelNote);
    document.querySelector("#create-btn").addEventListener("click", createNote);
    lucide.createIcons();
}

function createNote() {
    const note = document.createElement("div");
    note.classList.add("note");

    const input = document.querySelector("#text-input").value.trim();

    if (input) {
        const span = document.createElement("div");
        span.classList.add("text");
        span.placeholder = "nota vazia";
        span.contentEditable = true;
        span.textContent = input;
        span.spellcheck = false;

        const options = document.createElement("div");
        options.classList.add("options");
        options.innerHTML = `
            <button class="opt-btn pin-note-btn">
                <i data-lucide="pin" class="icon"></i>
            </button>
            <button class="opt-btn remove-note-btn">
                <i data-lucide="trash" class="icon"></i>
            </button>
        `;
        
        note.append(span);
        note.append(options);    
        document.querySelector("#notes").append(note);
        lucide.createIcons();

        note.querySelector(".remove-note-btn").addEventListener("click", removeNote);
        note.querySelector(".pin-note-btn").addEventListener("click", function() { pinNote(this) });
    }

    document.querySelector("#note-input").remove();
    addNoteBtn.classList.toggle("hide");
}

function removeNote(event) {
    event.target.closest(".note").remove();
    checkPinnedNotes();
}

function pinNote(btn) {
    document.querySelector("#pinned-notes").classList.remove("hide");
    const note = btn.closest(".note");

    if (btn.querySelector(".icon").classList.contains("filled")) {
        btn.querySelector(".icon").classList.remove("filled");
        document.querySelector("#notes").append(note);
        checkPinnedNotes();
    }
    else {
        btn.querySelector(".icon").classList.add("filled");
        document.querySelector("#pinned-notes").append(note);
        document.querySelectorAll(".section-label").forEach(label => label.classList.remove("hide"));
    }
}

function checkPinnedNotes() {
    const pinnedNotes = document.querySelector("#pinned-notes");
    if (pinnedNotes.children.length === 0) {
        pinnedNotes.classList.add("hide");
        document.querySelectorAll(".section-label").forEach(label => label.classList.add("hide"));
    }
}

});


// <div class="note">
//     <span class="text">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod minus, 
//         minima, vel magnam illo necessitatibus delectus harum sapiente, totam 
//         fugit laborum dolore.
//     </span>
//     <div class="options">
//         <button class="remove-btn" id="remove-note-btn">
//             <i data-lucide="trash" class="icon"></i>
//         </button>
//         <button class="remove-btn" id="edit-note-btn">
//             <i data-lucide="pen" class="icon"></i>
//         </button>
//     </div>
// </div>