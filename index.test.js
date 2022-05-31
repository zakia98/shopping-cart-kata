let total = require('./index')

test('No discount, adds items of same type C', () => {
    let cart = ['C', 'C', 'C'];
    let totalPrice = total(cart)
    
    expect(totalPrice).toEqual(0.75)
});

test('No discount, adds items of different types', () => {
    let cart = ['A', 'A', 'C'];
    let totalPrice = total(cart)
    
    expect(totalPrice).toEqual(1.25)
});

test.skip('Discount on 3 items of same type B', () => {
    let cart = ['B', 'B', 'B'];
    let totalPrice = total(cart);

    expect(totalPrice).toEqual(2.00);
});

test.skip('Buy 3, get 1 free', () => {
    let cart = ['C', 'C', 'C', 'C'];
    let totalPrice = total(cart);

    expect(totalPrice).toEqual(0.75);
});

test.skip('Two discounts applied in one transaction', () => {
    let cart = ['B', 'B', 'C', 'C', 'C', 'C'];
    let totalPrice = total(cart);

    expect(totalPrice).toEqual(2.00);
});



