const total = function(cart, prices, discounts) {
    // total loops over the cart and adds up the price of all of the items in the cart.
    // it then calculates the discount using calculateDiscount,
    // and returns the price minus the discount value.

    let price = cart.reduce((previousValue, currentValue) => {
        if (prices[currentValue] == undefined) {
            throw new Error(`The price of ${currentValue} is not defined!`)
        } 
        if (typeof prices[currentValue] != 'number') { 
            throw new Error(`The price of ${currentValue} is not a number!`)
        } 
        
        return previousValue + prices[currentValue];
    }, 0)

    const discount = calculateDiscounts(cart, discounts)

    return price - discount
}

const calculateDiscounts = function(cart, discounts) {
    // calculateDiscounts takes the input of carts, and returns the amount of discount.
    
    // The function translates the array into an object with the quantity of each item, itemCount. 
    const itemCount = {};
    for (let item of cart) {
        //If item exists, add 1, else initialise to default value 1. 
        itemCount[item] = (itemCount[item] || 0) + 1
    }

    // Loops through the discounts object, and if in itemCount it calculates the number of
    // times the discount needs to be applied, and then adds to total discount. 
    let totalDiscount = 0
    for (let sku in discounts) {
        if (typeof discounts[sku].discount != 'number') {
            throw new Error(`The discount for ${sku} is not a number`)
        }
        if (typeof discounts[sku].qualifier != 'number') {
            throw new Error(`The discount qualifier for ${sku} is not a number`)
        }
        if (discounts[sku].qualifier < 1) {
            throw new Error(`The discount qualifier for ${sku} is less than 1!`)
        }

        if (itemCount[sku] != undefined) {
            let discountMultiplier = Math.floor(itemCount[sku] / discounts[sku].qualifier);
            let itemDiscount = discounts[sku].discount * discountMultiplier
            totalDiscount += itemDiscount
        }
    }

    return totalDiscount
}

module.exports = {
    total:total,
    calculateDiscounts:calculateDiscounts
}