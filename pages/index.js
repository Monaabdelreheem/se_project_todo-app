//import necessary modules and components
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

//constants for DOM elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const counterText = document.querySelector(".counter__text");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

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
  section.addItem(generateTodo(values));
  todoCounter.updateTotal(true);
  addTodoPopup.close();
  addTodoForm.reset(); 
  newTodoValidator.resetValidation();
}
}
); 


addTodoPopup.setEventListeners(); 

function handleCheck(completed) {
  // Update the counter when a checkbox is checked or unchecked
  todoCounter.updateCompleted(completed);

}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateTotal(false);
    
  }
}

// Function to generate a Todo element from data
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
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


// Event listeners for adding a new todo
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  addTodoForm.reset(); // Reset the form fields
});


// Enable form validation
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();







