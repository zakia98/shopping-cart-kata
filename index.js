let prices = {
    A:0.50,
    B:0.75,
    C:0.25
}

const total = function(cart) {
    // this function should take an array of items, and return the total price of the items.

    let price = cart.reduce((previousValue, currentValue) => previousValue + prices[currentValue], 0)

    //  Now need to implement a way of adding discounts to final price

    const discount = calculateDiscounts(cart)

    return price - discount
}

const calculateDiscounts = function(cart) {
    // this function will take an input of carts, return the amount of discount

    // first, the function needs to translate the array of items into an object with 
    // the number of times it appears in the array
    // then, it will check against the qualifier amount in the discounts object to see how many times to apply the
    // discount.
    // The function should loop through the object and total up the discount amount.

    const itemCount = {};
    for (let item of cart) {
        itemCount[item] = 
    }

}

module.exports = total