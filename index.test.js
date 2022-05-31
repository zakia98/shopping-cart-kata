let total = require('./index')

test('No discount, adds items of same type C', () => {
    let cart = ['C', 'C', 'C'];
    let discounts = {}
    let totalPrice = total(cart, discounts)
    
    expect(totalPrice).toEqual(0.75)
});

test('No discount, adds items of different types', () => {
    let cart = ['A', 'A', 'C'];
    let discounts = {}
    let totalPrice = total(cart, discounts)
    
    expect(totalPrice).toEqual(1.25)
});

test('Discount on 3 items of same type B', () => {
    let cart = ['B', 'B', 'B'];
    let discounts = {
        B:{
            qualifier: 2,
            discount: 0.25
        },
        C: {
            qualifier: 4,
            discount: 0.25
        }
    }
    let totalPrice = total(cart, discounts);

    expect(totalPrice).toEqual(2.00);
});

test('Buy 3, get 1 free', () => {
    let cart = ['C', 'C', 'C', 'C'];
    let discounts = {
        B:{
            qualifier: 2,
            discount: 0.25
        },
        C: {
            qualifier: 4,
            discount: 0.25
        }
    }
    let totalPrice = total(cart, discounts);

    expect(totalPrice).toEqual(0.75);
});

test('Two discounts applied in one transaction', () => {
    let cart = ['B', 'B', 'C', 'C', 'C', 'C'];
    let discounts = {
        B:{
            qualifier: 2,
            discount: 0.25
        },
        C: {
            qualifier: 4,
            discount: 0.25
        }
    }
    let totalPrice = total(cart, discounts);

    expect(totalPrice).toEqual(2.00);
});



