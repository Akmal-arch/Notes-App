document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("dragstart", dragStart);
  document.addEventListener("dragover", dragOver);
  document.addEventListener("drop", dropCard);

  // Event listener for adding list on Enter key press
  document.getElementById('list-name').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          addList();
      }
  });

  // Event listener for adding card on Shift+Enter key press
  document.addEventListener('keypress', function(event) {
      if (event.key === 'Enter' && event.shiftKey) {
          const listId = event.target.closest('.list').id;
          addCard(listId);
      }
  });
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
    <h3 class="list-title">${listName}</h3>
    <div class="card-container"></div>
    <button class="remove-btn" onclick="removeList('${list.id}')">Remove List</button>
    <button onclick="addCard('${list.id}')">Add Card</button>
  `;
  board.appendChild(list);
  document.getElementById("list-name").value = "";

  // Add event listener for editing list title
  list.querySelector('.list-title').addEventListener('click', editListTitle);
}

function editListTitle() {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = this.textContent;
  this.replaceWith(input);

  input.addEventListener('blur', function() {
      const h3 = document.createElement('h3');
      h3.className = 'list-title';
      h3.textContent = this.value;
      this.replaceWith(h3);

      // Re-attach the click event listener
      h3.addEventListener('click', editListTitle);
  });

  input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          input.blur();
      }
  });

  input.focus();
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

  // Add event listener for editing card text
  card.addEventListener('dblclick', editCardText);
}

function editCardText() {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = this.firstChild.nodeValue;
  this.replaceWith(input);

  input.addEventListener('blur', function() {
      const card = document.createElement('div');
      card.className = 'card';
      card.draggable = true;
      card.innerHTML = `${this.value} <button class="remove-btn" onclick="removeCard('${this.parentNode.id}')">X</button>`;
      this.replaceWith(card);

      // Re-attach the double click event listener
      card.addEventListener('dblclick', editCardText);
  });

  input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          input.blur();
      }
  });

  input.focus();
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
  if (e.target.closest(".card-container") || e.target.classList.contains("card")) {
      e.preventDefault();
  }
}

function dropCard(e) {
  e.preventDefault();
  const cardId = e.dataTransfer.getData("text");
  const card = document.getElementById(cardId);
  const container = e.target.closest(".card-container");
  if (container) {
      container.appendChild(card);
  }
}
