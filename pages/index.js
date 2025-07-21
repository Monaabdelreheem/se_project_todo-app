//import necessary modules and components
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

//constants for DOM elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const counterText = document.querySelector(".counter__text");

// Create a new PopupWithForm instance
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup", 
handleFormSubmit: (inputValues)=> {
    const name = inputValues.name;
  const dateInput = inputValues.date;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();
  const values = { name, date: dateInput, id };
   // create a new Todo instance
  // const todo = new Todo(values, "#todo-template", updateCounter);
  // const todoElement = todo.getView();
  section.addItem(generateTodo(values));
  updateCounter();
  addTodoPopup.close();
  addTodoForm.reset(); // Reset the form fields after submission
  newTodoValidator.resetValidation();
}
}
); 


addTodoPopup.setEventListeners(); 

// Function to generate a Todo element from data
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", updateCounter);
  const todoElement = todo.getView();
  return todoElement;
};

// Create a new Section instance with initial todos
const section = new Section({
  items: initialTodos,
  renderer: generateTodo,
  containerSelector: ".todos__list",
});

// Render initial todos
section.renderItems();

// Function to open and close modals
// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };


// Event listeners for adding a new todo
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  addTodoForm.reset(); // Reset the form fields
});



// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();


// Function to update the counter text
function updateCounter() {
  const allTodos = document.querySelectorAll(".todo");
  const completedTodos = document.querySelectorAll(".todo.todo_completed");

  const total = allTodos.length;
  const completed = completedTodos.length;

  counterText.textContent = `${completed} out of ${total} completed`;
}

// Initial counter update
updateCounter();

// Enable form validation
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
