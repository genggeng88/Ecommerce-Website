if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    updateCartTotal()
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}


function removeCartItem(event) {
    var buttonClicked = event.target
    alert(`"${buttonClicked.parentElement.parentElement
        .getElementsByClassName("cart-item-title")[0]
        .innerHTML.replace(".", "")}" will be removed!`)
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var inCart = addItemToCart(title, price, imageSrc)

    if (inCart != 1) {
        alert(`"${title.replace(".", "")}" will be added to your cart!`)
    }
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-item')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert(`"${title.replace(".", "")}" is already added to the cart.
            Please directly change the quantity!`)
            return 1
        }
    }
    var cartRowContents = `
    <div class="image"><img src="${imageSrc}" width=280 height=280></div>
          <div class="describe">
            <center>
              <div class="cart-item-title">${title}</div>
              <p>Qty:
                <input class="quantity" type="number" min="1" value="1">
              </p><br>
              <input type="submit" class="btn-danger" value="remove"><br><br>
              <input type="submit" value="save for later">
            </center>
          </div>
          <div class="price">
            <p>Price:<br><input type="text" class="item-price" value="${price}" readonly></p>
          </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('quantity')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartRows = document.getElementsByClassName('cart-item')
    var prices = document.getElementsByClassName('item-price')
    var quantities = document.getElementsByClassName('quantity')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        total += parseFloat(prices[i].value.replace('$', '')) * parseInt(quantities[i].value)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('subtotal0')[0].value = '$' + total
}