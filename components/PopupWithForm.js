import Popup from "./Popup.js"

class PopupWithForm extends Popup {
constructor({ popupSelector, handleFormSubmit, _inputList }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues(){
const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
    
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault(); 
      const inputValues = this._getInputValues();

      // Call the handleFormSubmit function with the input values
    this._handleFormSubmit(inputValues);


  });

  }
}



export default PopupWithForm;
