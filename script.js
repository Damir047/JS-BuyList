// власне товари
let cart = {
    'tomato': {
        "name" : "Помідори",
        "count" : 3,
        "isBought": false
    },
    'apple': {
        "name" : "Яблука",
        "count" : 2,
        "isBought": false
    },

     'cookies': {
        "name" : "Печиво",
        "count" : 1,
        "isBought": true
    },
};


// надання слухачів кнопкам
document.onclick = event => {
    if(event.target.classList.contains('plus')){
         plusFunction(event.target.dataset.id);
    }
    if(event.target.classList.contains('minus')){
        minusFunction(event.target.dataset.id);
    }
    if(event.target.classList.contains('delete')){
        deleteFunction(event.target.dataset.id);
    }
    if(event.target.classList.contains('status')){
        statusFunction(event.target.dataset.id);
    }
    if(event.target.classList.contains('item-name')){
        changeNameFunction(event.target, event.target.dataset.id);
    }
}

// додавання кількості

const plusFunction = id => {
    cart[id]['count']++;
    renderCart();
}

// віднімання кількості

const minusFunction = id => {
   if (cart[id]['count'] === 1) {
        return; 
    }
    cart[id]['count']--;
    renderCart();
}

// видалення

const deleteFunction = id => {
    delete cart[id];
    renderCart();
    }

// статус куплено або не куплено

const statusFunction = id => {
    cart[id]['isBought'] = !cart[id]['isBought']; 
    renderCart();
}

// додавання нового об'єкту
const addFunction = () => {
    const addField = document.getElementById('q');
    const newName = addField.value;

    cart[newName] = {
        "name": newName,
        "count": 1,
        "isBought": false
    };
    
    addField.value = '';

    renderCart();
    addField.focus();
}

document.querySelector('form').onsubmit = event => {
    event.preventDefault(); 
    addFunction();
}

// відображення статусу товаріву правій частині 

const itemStatistic = () =>{
    const statsLeft = document.getElementById('left-items');
    const statsBought = document.getElementById('bought-items');

    let leftHTML = '';
    let boughtHTML = '';

    for (let id in cart) {
        let item = cart[id];

        const statItemHTML = `<span class="left-item">${item.name} <span class="left-item-amount">${item.count}</span></span>`;

        if (item.isBought === true) {
            boughtHTML += statItemHTML;
        } else {
            leftHTML += statItemHTML;
        }
    }

    statsLeft.innerHTML = leftHTML;
    statsBought.innerHTML = boughtHTML;

}

// функція зміни імені поточного об'єкту

const changeNameFunction = (spanElement, id) => {
    if (cart[id].isBought) {
        return;
    }

    const currentName = cart[id].name;

    spanElement.innerHTML = `<input type="text" value="${currentName}" style="width: 200px;">`;

    const inputElement = spanElement.querySelector('input');
    inputElement.focus();

    inputElement.onblur = () => {
        const newName = inputElement.value;
        
        if (newName !== '') {
            cart[id].name = newName; 
        }
        renderCart(); 
    }

    inputElement.onkeydown = (event) => {
        if (event.key === 'Enter') {
            inputElement.blur();
        }
    }
}


// відтворення кошику із логікою
const renderCart = () => {
    const cartList = document.querySelector('.left-side ul');
    
    let out = '';

    for (let id in cart) {
        let item = cart[id];

        const crossOrNot = item.isBought ? 'text-decoration: line-through;' : '';

        const amountButtons = item.isBought 
            ? `<span class="amount">${item.count}</span>` 
            : `<button class="minus" data-tooltip="Зменшити" data-id="${id}" ${item.count === 1 ? 'disabled' : ''}>-</button>
               <span class="amount">${item.count}</span>
               <button class="plus" data-tooltip="Збільшити" data-id="${id}">+</button>`;

        const deleteButton = item.isBought 
            ? '' 
            : `<button class="delete" data-id="${id}" data-tooltip="Видалити товар">X</button>`;

        out += `
              <li class="katalog">

                    <span class="item-name" style="${crossOrNot}" data-id="${id}" >${item.name}</span>

                    <div class="item-amount">
                      ${amountButtons}
                    </div>

                    <div class="item-functions">
                        <button class="status" data-id="${id}" data-tooltip="Змінити статус">
                          ${item.isBought ? 'Куплено' : 'Не куплено'}
                          </button>
                        ${deleteButton}

                    </div>
                </li>`;
    }
    cartList.innerHTML = out;
    itemStatistic();
}

renderCart();
