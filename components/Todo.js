class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._completed = data.completed;
    this._id = data.id;
    this._selector = selector; 
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDelete(this._data.completed);
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      if (this._data.completed) {
        this._todoElement.classList.add("todo_completed");
      } else {
        this._todoElement.classList.remove("todo_completed");
      }

      this._handleCheck(this._data.completed);
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDateEl() {
    const todoDate = this._todoElement.querySelector(".todo__date");

    if (this._data.date) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate)) {
        todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      } else {
        todoDate.textContent = "";
      }
    } else {
      todoDate.textContent = "";
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._generateDateEl();
    this._generateCheckboxEl();
    if (this._data.completed) {
      this._todoElement.classList.add("todo_completed");
    }
    this._setEventListeners();

    return this._todoElement;
  }
}
export default Todo;
