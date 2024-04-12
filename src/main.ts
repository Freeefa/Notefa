import "./index.css";
import { v4 as uuidv4 } from "uuid";

// custom type
type itemType = {
  id: string;
  title: string;
  text: string;
};

// select element
const form = document.querySelector<HTMLFormElement>("#note-form");
const title = document.querySelector<HTMLInputElement>("#title");
const text = document.querySelector<HTMLInputElement>("#text");
const noteList = document.querySelector<HTMLDivElement>("#itemNote")!;
let noteLocalStorage: itemType[] = parsLocalStorage();
noteLocalStorage.forEach(addNote);
const clearButton = document.querySelector("#clear-notes");

//? the first method
//add event listener for select element and print in console

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  // error handling
  if (title?.value == undefined || text?.value == undefined) return;
  const listNote: itemType = {
    id: uuidv4(),
    title: title?.value,
    text: text?.value,
  };

  noteLocalStorage.push(listNote);

  addNote(listNote);

  saveLocalStorage();

  title.value = "";
  text.value = "";
});

clearButton?.addEventListener("click", () => {
  clearLocalStorage();
});

// create Function Declaration for  render object to window
function addNote(itemNote: itemType) {
  /* createElement */
  const container = document.createElement("div");
  const titleElement = document.createElement("h2");
  const textElement = document.createElement("p");
  const deleteButton = document.createElement("button");

  //  append Elements
  //   deleteButton.textContent = "delete";
  deleteButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-500 hover:text-red-700">
    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
  </svg>
`;

  titleElement.append(itemNote.title);
  textElement.append(itemNote.text);
  container.append(titleElement, textElement, deleteButton);
  noteList?.append(container);

  container.classList.add(
    "p-4",
    "bg-slate-400",
    "max-w-6xl",
    "rounded",
    "w-3/4",
    "m-4"
  );
  titleElement.classList.add("text-2xl", "text-blue-800");
  deleteButton.classList.add("float-right");
  deleteButton.addEventListener("click", () => {
    deleteNoteFromLocalStorage(itemNote.id);
    container.remove();
  });
}

function saveLocalStorage() {
  localStorage.setItem("items", JSON.stringify(noteLocalStorage));
}

function parsLocalStorage(): itemType[] {
  const data = localStorage.getItem("items");
  if (data == null) return [];
  return JSON.parse(data);
}

function clearLocalStorage(): void {
  localStorage.removeItem("items");
  noteList.innerHTML = "";
  noteLocalStorage = [];
}

// Function to delete a note from localStorage
function deleteNoteFromLocalStorage(noteId: string): void {
  noteLocalStorage = noteLocalStorage.filter((note) => note.id !== noteId);
  saveLocalStorage();
}

//? the second method
//!add event listener for select element and print in console

// form?.addEventListener("submit", (e) => {
//     e.preventDefault();
//!   error handling
//     if (title?.value == undefined || text?.value == undefined) return;
//     const listNote = {
//       id: uuidv4(),
//       title: title?.value,
//       text: text?.value,
//     };
//! Create a new note element
//     const noteItem = document.createElement("div");
//     noteItem.classList.add("note");
//     noteItem.innerHTML = `<h3>${listNote.title}</h3> <p>${listNote.text}</p>`;

//! Append the new note to the target element
//     noteList?.appendChild(noteItem);

//! Clear the form after successful submission (optional)
//     title.value = "";
//     text.value = "";
//   });

// titleElement.style.fontSize = "1.5rem";
