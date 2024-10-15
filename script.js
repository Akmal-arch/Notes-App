document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("dragstart", dragStart);
    document.addEventListener("dragover", dragOver);
    document.addEventListener("drop", dropCard);
});

let listCounter = 0;
let cardCounter = 0;

function addList() {
    const listName = document.getElementById("list-name").value.trim();
    if (!listName) return;

    listCounter++;
    const board = document.getElementById("board");
    const list = document.createElement("div");
    list.className = "list";
    list.id = `list-${listCounter}`;
    list.innerHTML = `
      <h3>${listName}</h3>
      <div class="card-container"></div>
      <button class="remove-btn" onclick="removeList('${list.id}')">Remove List</button>
      <button onclick="addCard('${list.id}')">Add Card</button>
    `;
    board.appendChild(list);
    document.getElementById("list-name").value = "";
}

function removeList(listId) {
    document.getElementById(listId).remove();
}

function addCard(listId) {
    const cardText = prompt("Enter task:");
    if (!cardText) return;

    cardCounter++;
    const cardContainer = document.getElementById(listId).querySelector(".card-container");
    const card = document.createElement("div");
    card.className = "card";
    card.id = `card-${cardCounter}`;
    card.draggable = true;
    card.innerHTML = `${cardText} <button class="remove-btn" onclick="removeCard('${card.id}')">X</button>`;
    cardContainer.appendChild(card);
}

function removeCard(cardId) {
    document.getElementById(cardId).remove();
}

function dragStart(e) {
    if (e.target.classList.contains("card")) {
        e.dataTransfer.setData("text/plain", e.target.id);
    }
}

function dragOver(e) {
    // Prevent default behavior for all child elements within the card-container
    if (e.target.closest(".card-container") || e.target.classList.contains("card")) {
      e.preventDefault();
    }
  }
  
  function dropCard(e) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text");
    const card = document.getElementById(cardId);
    
    // Find the closest card-container for dropping, whether it's over a card or an empty container
    const container = e.target.closest(".card-container");
    
    // Append the card to the container if it exists
    if (container) {
      container.appendChild(card);
    }
  }
  