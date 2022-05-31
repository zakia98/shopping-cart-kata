let prices = {
    A:0.50,
    B:0.75,
    C:0.25
}

const total = function(cart, discounts) {
    // this function should take an array of items, and return the total price of the items.

    let price = cart.reduce((previousValue, currentValue) => previousValue + prices[currentValue], 0)

    //  Now need to implement a way of adding discounts to final price

    const discount = calculateDiscounts(cart, discounts)

    return price - discount
}

const calculateDiscounts = function(cart, discounts) {
    // this function will take an input of carts, return the amount of discount

    // first, the function needs to translate the array of items into an object with 
    // the number of times it appears in the array
    // then, it will check against the qualifier amount in the discounts object to see how many times to apply the
    // discount.
    // The function should loop through the discounts object and total up the discount amount.

    const itemCount = {};
    for (let item of cart) {
        //If item exists, add 1, else initialise to default value 1. 
        itemCount[item] = (itemCount[item] || 0) + 1
    }
    
    // we want to loop through and divide the number of items in the cart by the qualifier to see how many times to
    // apply the discount. 
    // Then we will multiply the discount by the discount multiplier to obtain the discount for the item, and
    // add it to the total discount.
    let totalDiscount = 0
    
    for (let sku in discounts) {
        if (itemCount[sku] != undefined) {
            let discountMultiplier = Math.floor(itemCount[sku] / discounts[sku].qualifier);
            let itemDiscount = discounts[sku].discount * discountMultiplier
            totalDiscount += itemDiscount
        }
    }

    return totalDiscount
}

module.exports = total