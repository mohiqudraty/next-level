class UIElement {
    id;
    constructor(id) {
        this.id = id;
    }
}
class Input extends UIElement {
    type;
    placeholder;
    constructor(id, type, placeholder) {
        super(id);
        this.type = type;
        this.placeholder = placeholder;
    }
    render() {
        return `<input id="${this.id}" type="${this.type}" placeholder="${this.placeholder}" style="padding: 5px; border: 1px #222 solid; border-radius: 5px; outline: none"/>`;
    }
}
class Button extends UIElement {
    label;
    constructor(id, label) {
        super(id);
        this.label = label;
    }
    render() {
        return `<button id="${this.id}" type="${this.label}" style="
      margin-top: 8px;
      padding: 12px 0;
      background: #4f46e5;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    ">Submit</button>`;
    }
}
class Form extends UIElement {
    children = [];
    appendChild(child) {
        this.children.push(child);
    }
    render() {
        const childrenHTML = this.children.map(child => child.render()).join("\n");
        return `<form id="${this.id}" style="
    max-width: 400px;
    margin: 40px auto;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    font-family: 'Segoe UI', system-ui, sans-serif;
  ">
    ${childrenHTML}
  </form>`;
    }
}
const formElement = new Form("login-form");
const nameInput = new Input("name", "text", "Enter Your Name");
const emailInput = new Input("email", "email", "Enter Your Email");
const passwordInput = new Input("pass", "password", "Enter Your Password");
const submitButton = new Button("submit-btn", "Submit");
formElement.appendChild(nameInput);
formElement.appendChild(emailInput);
formElement.appendChild(passwordInput);
formElement.appendChild(submitButton);
// console.log(formElement.render());
const rootElement = document.getElementById("root");
if (rootElement) {
    rootElement.innerHTML = formElement.render();
}
export {};
// console.log(emailInput.render());
// console.log(passwordInput.render());
// console.log(submitButton.render());
