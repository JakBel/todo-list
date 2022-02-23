let todoInput; // miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo; // info o braku zadań / konieczności wpisania tekstu
let addBtn; // przycisk ADD, dodaje nowe elementy do listy
let ulList; // lista zadań, tagi UL
//let newTodo; // nowo dodany LI, nowe zadanie

let popup; // popup
let popupInfo; // tekst informujący o pustym popupie
let todoToEdit; // edytowany todo
let popupInput; // informacje w popupie
let popupAddBtn; // przycisk "zatwierdź" w popupie
let popupCloseBtn; // przycisk "anuluj" w popupie

const qs = (e) => document.querySelector(e);

//główna funkcja wywołująca pozostałe
const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};
//pobieranie wszystkich elementów
const prepareDOMElements = () => {
    todoInput = qs(".todo-input");
    errorInfo = qs(".error-info");
    addBtn = qs(".btn-add");
    ulList = qs(".toDoList ul");

    popup = qs(".popup");
    popupInfo = qs(".popup-info");
    popupInput = qs(".popup-input");
    popupAddBtn = qs(".accept");
    popupCloseBtn = qs(".cancel");
};
//nadawanie nasłuchiwania
const prepareDOMEvents = () => {
    addBtn.addEventListener("click", addNewTodo);
    ulList.addEventListener("click", checkClick);
    popupCloseBtn.addEventListener("click", closeEditTodo);
    popupAddBtn.addEventListener("click", changeTodoText);
    todoInput.addEventListener("keyup", enterKeyCheck);
};

//funkcje
const addNewTodo = () => {
    if (todoInput.value !== "") {
        const newTodo = document.createElement("li");
        newTodo.textContent = todoInput.value;
        createToolsArea(newTodo);
        ulList.append(newTodo);

        todoInput.value = "";
        errorInfo.textContent = "";
    } else {
        errorInfo.textContent = "Podaj nazwę zadania!";
    }
};

const createToolsArea = (newTodo) => {
    if (todoInput.value !== "") {
        const div = document.createElement("div");
        div.classList.add("tools");

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete");
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.textContent = "EDIT";

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

        div.append(completeBtn, editBtn, deleteBtn);
        newTodo.append(div);
    }
};

const checkClick = e => {
    if (e.target.matches(".complete")) {
        e.target.closest("li").classList.toggle("completed");
        e.target.classList.toggle("completed");
    } else if (e.target.matches(".edit")) {
        editTodo(e);
    } else if (e.target.matches(".delete")) {
        deleteTodo(e);
    }
};

const deleteTodo = e => {
    e.target.closest("li").remove();
    popup.style.display = 'none';

    const allTodo = ulList.querySelectorAll("li");
    if(allTodo.length === 0) {
        errorInfo.textContent = "Brak zadań na liście";
    }
}
const editTodo = e => {
    popup.style.display = "flex";
    todoToEdit = e.target.closest('li');
    popupInput.value = todoToEdit.firstChild.textContent;
};
const closeEditTodo = () => {
    popup.style.display = 'none';
    popupInfo.textContent = "";
}
const changeTodoText = () => {
    if(popupInput.value !== "") {
        todoToEdit.firstChild.textContent = popupInput.value;
        popupInfo.textContent = "";
        popup.style.display = "none";
    } else {
        popupInfo.textContent = "Wprowadź treść zadania!";
    }
}

const enterKeyCheck = e => {
    if(e.key === "Enter") {
        addNewTodo();
    }
}

document.addEventListener("DOMContentLoaded", main);
