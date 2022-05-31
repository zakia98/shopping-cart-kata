# shopping-cart-kata
## Description:
A shopping cart system which calculates the total price of a number of items, and applies any relevant promotions.

The shopping cart system accepts items in any order, so can apply the correct promotions regardless of scan order. 

### Types of promotions possible
- Multibuy promotion: buy x amount of product A for a cheaper price y. 
- Buy z amount of product B and receive 1 free.

## Usage
The total function takes three inputs: `cart`, `prices`, and`discounts`.
- The cart variable must be in the form of an array, such as: 
```["A', "B", "C"]```
- Prices, is an object which provides the prices of each corresponding SKU:
```
{
  A:2.50,
  B:0.50,
  C:1.73
}
```
- Discounts is an object which provides the discounts available on each item. It must be in the below format. `Qualifier` represents the number of items necessary to qualify for the discount. If the discount is a negative number, the price will increase instead of decreasing when the discount is applied. 
```
{
  A:{
    qualifier:2,
    discount:0.50
  }, 
  B: {
    qualifier: 1,
    discount:0.25
  }
}
```
Note: If the base price of the item is changed, in order to maintain the same level of discount (e.g. 50%) the discount value must also be changed.


## Errors:
The following errors may occur for these situations:
- `The discount qualifier for X is less than 1!`: Discount qualifier needs to be a value greater than 1.
- `The discount qualifier for X is not a number`: The discount qualifier needs to be a number.
- `The price of X is not a number`: The price of X needs to be a number, not a string.
- `The price of X is not defined`: The price of X has not been set in the prices object. 

## Limitations
This shopping cart system system has the following limitations:
- Will not work for other promotions not listed in the specification such as `Buy 3, cheapest item free`, and will require changes for such an implementation.
- Will not work if there are multiple discounts for 1 item, however it is rare that a store may want more than 1 discount on an item.
