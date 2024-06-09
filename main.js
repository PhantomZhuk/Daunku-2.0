let db = [
    {
        id: 1,
        name: 'Грація',
        price: 65,
        pic: '1.png'
    },
    {
        id: 2,
        name: 'Теракота',
        price: 100,
        pic: '2.png'
    },
    {
        id: 3,
        name: 'Криштал',
        price: 99,
        pic: '3.png'
    }
];

let cartListOredr = [];


function showPlants(db) {
    for (let el of db) {
        $('.flowerblock').append(`<div class='plantItem' id="plantItem${el.id}">
        <img src='./img/${el.pic}' alt='plant'>
        <div class='plantItemInfo'>
            <h3>${el.name}</h3>
            <div class="plangItemGroup">
            <p>${el.price}</p>
            <button id='add${el.id}'><svg id='add${el.id}' width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id='add${el.id}' fill-rule="evenodd" clip-rule="evenodd" d="M30 0.666687C13.8 0.666687 0.666664 13.8 0.666664 30C0.666664 46.2 13.8 59.3334 30 59.3334C46.2 59.3334 59.3333 46.2 59.3333 30C59.3333 13.8 46.2 0.666687 30 0.666687ZM32.6667 40.6667C32.6667 41.3739 32.3857 42.0522 31.8856 42.5523C31.3855 43.0524 30.7072 43.3334 30 43.3334C29.2928 43.3334 28.6145 43.0524 28.1144 42.5523C27.6143 42.0522 27.3333 41.3739 27.3333 40.6667V32.6667H19.3333C18.6261 32.6667 17.9478 32.3857 17.4477 31.8856C16.9476 31.3855 16.6667 30.7073 16.6667 30C16.6667 29.2928 16.9476 28.6145 17.4477 28.1144C17.9478 27.6143 18.6261 27.3334 19.3333 27.3334H27.3333V19.3334C27.3333 18.6261 27.6143 17.9478 28.1144 17.4477C28.6145 16.9476 29.2928 16.6667 30 16.6667C30.7072 16.6667 31.3855 16.9476 31.8856 17.4477C32.3857 17.9478 32.6667 18.6261 32.6667 19.3334V27.3334H40.6667C41.3739 27.3334 42.0522 27.6143 42.5523 28.1144C43.0524 28.6145 43.3333 29.2928 43.3333 30C43.3333 30.7073 43.0524 31.3855 42.5523 31.8856C42.0522 32.3857 41.3739 32.6667 40.6667 32.6667H32.6667V40.6667Z" fill="url(#paint0_linear_0_104)"/>
            <defs>
            <linearGradient id="paint0_linear_0_104" x1="0.666664" y1="30" x2="59.3333" y2="30" gradientUnits="userSpaceOnUse">
            <stop stop-color="#2AF598"/>
            <stop offset="1" stop-color="#009EFD"/>
            </linearGradient>
            </defs>
            </svg>
            </button>
            </div>
        </div>
        </div>`)
    }

}

showPlants(db);

let cartList = JSON.parse(localStorage.getItem('cartList')) || [];

$('.counter').text(cartList.length);

$('.wrap').click((e) => {
    let target = (e.target.id).substring(0, 3);
    if (target === 'add') {
        let ID = (e.target.id).substring(3);
        let existingItemIndex = cartList.findIndex(item => item.id === parseInt(ID));
        if (existingItemIndex !== -1) {
            cartList[existingItemIndex].quantity++;
        } else {
            let newItem = { ...db.find(item => item.id === parseInt(ID)), quantity: 1 };
            cartList.push(newItem);
        }
        updateCart();
    }
});

function showCartList(cartList) {
    for (let el of cartList) {
        let quantityClass = `numberFlower${el.id}`;
        $('.cartPopupContainer').append(
            `
            <div class="cart">
                <img src='./img/${el.pic}' alt='plant'>
                <div class="cartInfo">
                    <h3>${el.name}</h3>
                    <div class="numberFlowerContainer">
                        <div class="numberFlowerBox">
                            <i class="fa-solid fa-plus plus${el.id}"></i>
                            <p class="${quantityClass}">${el.quantity}</p>
                            <i class="fa-solid fa-minus minus${el.id}"></i>
                        </div>
                        <i class="fa-solid fa-trash-can" id="delete${el.id}"></i>
                    </div>
                </div>
            </div>
            `
        );
        updateCartItem(el.name, el.quantity);
    }
    $(`#cartList`).val(JSON.stringify(cartListOredr));
}

function updateCartItem(name, quantity) {
    let existingItemIndex = cartListOredr.findIndex(function (item) {
        return item.name === name;
    });

    if (existingItemIndex !== -1) {
        cartListOredr[existingItemIndex].quantity = quantity;
    } else {
        cartListOredr.push({ name: name, quantity: quantity });
    }
}

showCartList(cartList);



$(`.buy`).click(() => {
    $(`.cartPopup`).css(`right`, `0`)
    $('.cartPopupContainer').empty();
    showCartList(cartList);;
});

$(`.closePopup`).click(() => {
    $(`.cartPopup`).css(`right`, `-400px`);
});

$('.cartPopupContainer').on('click', '.fa-trash-can', (e) => {
    let ID = e.target.id.split('delete').pop();
    let indexToRemove = cartList.findIndex(item => item.id === parseInt(ID));
    if (indexToRemove !== -1) {
        cartList.splice(indexToRemove, 1);
        localStorage.setItem('cartList', JSON.stringify(cartList));
        $('.counter').text(cartList.length);
        $('.cartPopupContainer').empty();
        showCartList(cartList);
    }
});

let theme = localStorage.getItem('theme') || 'light';

if (theme === 'light') {
    $('.fa-moon').hide();
    $('.fa-sun').show();
    $(`.secondPage`).css(`background-color`, `#fff`);
    $(`.secondPage`).css(`color`, `#000`);
    $(`.secondPage`).css(`background-color`, `#fff`);
    $(`.plantItemInfo`).css(`background-color`, `#fff`);
    $(`.plantItemInfo`).css(`box-shadow`, `0 2px 5px #eee`);
    $(`.plantItem`).css(`background-color`, `#C1D0E4`);
    $('.secondPage *').css('color', '#000');
    $(`.threethPage`).css(`background-color`, `#fff`);
    $('.threethPage *').css('color', '#000');
    $(`.fourthPage`).css(`background-color`, `#fff`);
    $('.fourthPage *').css('color', '#000');
    $(`.while`).css(`color`, `#fff`);
    $(`.cartPopup`).css(`background-color`, `#fff`);
    $(`.cartPopup *`).css(`color`, `#000`)
    $(`.cartInfo`).css(`background-color`, `#fff`);
    $(`.cartInfo`).css(`box-shadow`, `0 2px 5px #eee`);
    $(`.cart`).css(`background-color`, `#c1d0e4`);
    $(`.menuPopup`).css(`background-color`, `#fff`);
} else if (theme === 'dark') {
    $('.fa-moon').show();
    $('.fa-sun').hide();
    $(`.secondPage`).css(`background-color`, `#333`);
    $(`.plantItemInfo`).css(`background-color`, `#333`);
    $(`.plantItemInfo`).css(`box-shadow`, `0 2px 5px #494e56`);
    $(`.plantItem`).css(`background-color`, `#6a727d`);
    $('.secondPage *').css('color', '#fff');
    $(`.threethPage`).css(`background-color`, `#333`);
    $('.threethPage *').css('color', '#fff');
    $(`.fourthPage`).css(`background-color`, `#333`);
    $('.fourthPage *').css('color', '#fff');
    $(`.cartPopup`).css(`background-color`, `#333`);
    $(`.cartPopup *`).css(`color`, `#fff`)
    $(`.cart`).css(`background-color`, `#6a727d`);
    $(`.cartInfo`).css(`background-color`, `#333`);
    $(`.cartInfo`).css(`box-shadow`, `0 2px 5px #494e56`);
    $(`.menuPopup`).css(`background-color`, `#333`);
}

$('.changeThemeBtns').click(function () {
    if (theme === 'light') {
        $('.fa-moon').show();
        $('.fa-sun').hide()
        $(`.secondPage`).css(`background-color`, `#333`);
        $(`.plantItemInfo`).css(`background-color`, `#333`);
        $(`.plantItemInfo`).css(`box-shadow`, `0 2px 5px #494e56`);
        $(`.plantItem`).css(`background-color`, `#6a727d`);
        $('.secondPage *').css('color', '#fff');
        $(`.threethPage`).css(`background-color`, `#333`);
        $('.threethPage *').css('color', '#fff');
        $(`.fourthPage`).css(`background-color`, `#333`);
        $('.fourthPage *').css('color', '#fff');
        $(`.cartPopup`).css(`background-color`, `#333`);
        $(`.cartPopup *`).css(`color`, `#fff`)
        $(`.cart`).css(`background-color`, `#6a727d`);
        $(`.cartInfo`).css(`background-color`, `#333`);
        $(`.cartInfo`).css(`box-shadow`, `0 2px 5px #494e56`);
        $(`.menuPopup`).css(`background-color`, `#333`);
        localStorage.setItem('theme', 'dark');
        theme = 'dark';
    } else if (theme === 'dark') {
        $('.fa-moon').hide();
        $('.fa-sun').show();
        $(`.secondPage`).css(`background-color`, `#fff`);
        $(`.secondPage`).css(`color`, `#000`);
        $(`.secondPage`).css(`background-color`, `#fff`);
        $(`.plantItemInfo`).css(`background-color`, `#fff`);
        $(`.plantItemInfo`).css(`box-shadow`, `0 2px 5px #eee`);
        $(`.plantItem`).css(`background-color`, `#C1D0E4`);
        $('.secondPage *').css('color', '#000');
        $(`.threethPage`).css(`background-color`, `#fff`);
        $('.threethPage *').css('color', '#000');
        $(`.fourthPage`).css(`background-color`, `#fff`);
        $('.fourthPage *').css('color', '#000');
        $(`.while`).css(`color`, `#fff`);
        $(`.cartPopup`).css(`background-color`, `#fff`);
        $(`.cartPopup *`).css(`color`, `#000`)
        $(`.cartInfo`).css(`background-color`, `#fff`);
        $(`.cartInfo`).css(`box-shadow`, `0 2px 5px #eee`);
        $(`.cart`).css(`background-color`, `#c1d0e4`);
        $(`.menuPopup`).css(`background-color`, `#fff`);
        localStorage.setItem('theme', 'light');
        theme = 'light';
    }
});

$(`.openMenuPopup`).click(() => {
    $(`.menuPopup`).css(`left`, `0`);
    setTimeout(() => {
        $(`.wrap`).hide();
    }, 1000);
});

$(`.closeMenuPopup`).click(() => {
    $(`.menuPopup`).css(`left`, `-100%`);
    $(`.wrap`).show();
});

$(`#shop`).click(() => {
    $(`.menuPopup`).css(`left`, `-100%`);
    $(`.wrap`).show();
});

$(`#home`).click(() => {
    $(`.menuPopup`).css(`left`, `-100%`);
    $(`.wrap`).show();
});

function updateCart() {
    localStorage.setItem('cartList', JSON.stringify(cartList));
    $('.counter').text(cartList.reduce((acc, cur) => acc + cur.quantity, 0));
    $('.cartPopupContainer').empty();
    showCartList(cartList);
}

$('.cartPopupContainer').on('click', '.fa-plus', (e) => {
    let ID = $(e.target).closest('.cart').find('.fa-trash-can').attr('id').replace('delete', '');
    console.log("ID:", ID);
    let itemIndex = cartList.findIndex(item => item.id == ID);
    if (itemIndex !== -1) {
        cartList[itemIndex].quantity += 1;
        updateCart();
        updateQuantityDisplay(ID, cartList[itemIndex].quantity);
        updateCartItem(cartList[ID].name, cartList[ID].quantity);
    }
});

$('.cartPopupContainer').on('click', '.fa-minus', (e) => {
    let ID = $(e.target).closest('.cart').find('.fa-trash-can').attr('id').replace('delete', '');
    console.log("ID:", ID);
    let itemIndex = cartList.findIndex(item => item.id == ID);
    if (itemIndex !== -1 && cartList[itemIndex].quantity > 1) {
        cartList[itemIndex].quantity -= 1;
        updateCart();
        updateQuantityDisplay(ID, cartList[itemIndex].quantity);
        updateCartItem(cartList[ID].name, cartList[ID].quantity);
    } else if (itemIndex !== -1 && cartList[itemIndex].quantity === 1) {
        cartList.splice(itemIndex, 1);
        updateCart();
        updateCartItem(cartList[ID].name, cartList[ID].quantity);
    }
});

function updateQuantityDisplay(ID, quantity) {
    let quantityClass = `.numberFlower${ID}`;
    $(quantityClass).text(quantity);
}

$(`#textFolower`).val(`У вас новий підписник!`)

let form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault();
    let status = document.getElementById("my-form-status");
    let data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showPopupFollower(`Ви підписались на оновлення`)
            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    showPopupFollower(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    showPopupFollower(`Помилка`)
                }
            })
        }
    }).catch(error => {
        showPopupFollower(`Помилка`)
    });
}
form.addEventListener("submit", handleSubmit);

function showPopupFollower(message) {
    $(`.popupFolower`).css(`display`, `flex`);
    $(`.popupFolower`).text(message);

    setInterval(() => {
        $(`.popupFolower`).css(`display`, `none`);
    }, 3000);
}

let form2 = document.getElementById("my-form2");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status2");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form2.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showPopupOrder(`Замовлення відправлено!`);
            form2.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    showPopupOrder(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    showPopupOrder(`Помилка!`);
                }
            })
        }
    }).catch(error => {
        showPopupOrder(`Помилка!`);
    });
}
form2.addEventListener("submit", handleSubmit)

function showPopupOrder(message) {
    $(`.popupOredr`).css(`display`, `flex`);
    $(`.popupOredr`).text(message);

    setInterval(() => {
        $(`.popupOredr`).css(`display`, `none`);
    }, 3000);
}