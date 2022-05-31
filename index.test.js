let shoppingCart = require('./index');
let total = shoppingCart.total
let calculateDiscounts = shoppingCart.calculateDiscounts

describe('total test set 1', () => {
    let prices = {
        A:0.50,
        B:0.75,
        C:0.25
    };

    test('No discount, adds items of same type C', () => {
        let cart = ['C', 'C', 'C'];
        let discounts = {}
        let totalPrice = total(cart, prices, discounts)
        
        expect(totalPrice).toEqual(0.75)
    });

    test('No discount, adds items of different types', () => {
        let cart = ['A', 'A', 'C'];
        let discounts = {}
        let totalPrice = total(cart, prices, discounts)
        
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
        let totalPrice = total(cart, prices, discounts);

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
        let totalPrice = total(cart, prices, discounts);

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
        let totalPrice = total(cart, prices, discounts);

        expect(totalPrice).toEqual(2.00);
    });
    
});

describe('calculateDiscounts', () => {
    let discounts = {
        B:{
            qualifier: 2,
            discount: 0.25
        },
        C: {
            qualifier: 4,
            discount: 0.25
        }
    };

    test('Multi-buy discount for B', () => {
        cart = ['B', 'B', 'B'];
        let discount = calculateDiscounts(cart, discounts)
        expect(discount).toEqual(0.25)
    });

    test('Get 1 item free discount for C', () => {
        cart = ['C', 'C', 'C', 'C'];
        let discount = calculateDiscounts(cart, discounts)
        expect(discount).toEqual(0.25)
    });

    test('Multi-buy and Get 1 item free disconts', () => {
        cart = ['B', 'B', 'C', 'C', 'C', 'C'];
        let discount = calculateDiscounts(cart, discounts)
        expect(discount).toEqual(0.50)
    })
})


describe('total test set error handling',  () => {
    test(`A cart item which has no price`, () => {
        let prices = {
            A:0.50,
            B:0.75,
        };
        let discounts = {
            B:{
                qualifier: 2,
                discount: 0.25
            },
            C: {
                qualifier: 4,
                discount: 0.25
            }
        };
        let cart = ['C', 'B', 'B']
        expect(() => total(cart, prices, discounts)).toThrow('The price of C is not defined!')
    });

    test(`A cart item's price is not an number`, () => {
        let prices = {
            A:0.50,
            B:"0.75",
            C:0.25
        };
        let discounts = {
            B:{
                qualifier: 2,
                discount: 0.25
            },
            C: {
                qualifier: 4,
                discount: 0.25
            }
        };
        let cart = ['C', 'B', 'B'];
        expect(() => total(cart, prices, discounts)).toThrow('The price of B is not a number')
    });

    test(`Discount qualifier is not a number`, () => {
        let prices = {
            A:0.50,
            B:0.75,
            C:0.25
        };
        let discounts = {
            B:{
                qualifier: "2a",
                discount: 0.50
            },
            C: {
                qualifier: 4,
                discount: 0.25
            }
        };
        let cart = ['C', 'B', 'B'];
        expect(() => total(cart, prices, discounts)).toThrow('The discount qualifier for B is not a number')
    });
    
    test(`Qualifier is negative`, () => {
        let prices = {
            A:0.50,
            B:0.75,
            C:0.25
        };
        let discounts = {
            B:{
                qualifier: -1,
                discount: 0.50
            },
            C: {
                qualifier: 4,
                discount: 0.25
            }
        };
        let cart = ['C', 'B', 'B'];
        expect(() => total(cart, prices, discounts)).toThrow('The discount qualifier for B is less than 1!')
    })
})


