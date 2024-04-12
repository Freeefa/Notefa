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
const noteList = document.querySelector<HTMLDivElement>("#itemNote");
const noteLocalStorage: itemType[] = parsLocalStorage();
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

  //  append Elements
  titleElement.append(itemNote.title);
  textElement.append(itemNote.text);
  container.append(titleElement, textElement);
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
