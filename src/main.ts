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

//? the first method
//add event listener for select element and print in console

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  //   error handling
  if (title?.value == undefined || text?.value == undefined) return;
  const listNote: itemType = {
    id: uuidv4(),
    title: title?.value,
    text: text?.value,
  };
  addNote(listNote);
});

// create Function Declaration for  render object to window
function addNote(itemNote: itemType) {
  /* createElement */
  const container = document.createElement("div");
  const titleElement = document.createElement("p");
  const textElement = document.createElement("p");

  //  append Elements
  titleElement.append(itemNote.title);
  textElement.append(itemNote.text);
  container.append(titleElement, textElement);
  noteList?.append(container);
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
