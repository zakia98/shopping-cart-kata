let prices = {
    A:0.50,
    B:0.75,
    C:0.25
}

const total = function(cart) {
    //this function should take an array of items, and return the total price of the items.

    let price = cart.reduce((previousValue, currentValue) => previousValue + prices[currentValue], 0)
    return price
}

module.exports = total