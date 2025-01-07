import { useState } from "react";

// Item data (could come from an API or database)
const items = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Headphones", price: 100 },
  { id: 3, name: "Smartphone", price: 800 },
];

const ShoppingCart = () => {
  // State to keep track of the cart items
  const [cart, setCart] = useState([]);

  // Add item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if the item is already in the cart
      const itemInCart = prevCart.find((cartItem) => cartItem.id === item.id);

      if (itemInCart) {
        // If item exists, increase quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If item does not exist, add it with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Shopping Cart</h1>

      {/* Item List */}
      <div>
        <h2>Available Items</h2>
        {items.map((item) => (
          <div key={item.id}>
            <span>{item.name} - ${item.price}</span>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart List */}
      <div>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id}>
                <span>
                  {item.name} - ${item.price} x {item.quantity}
                </span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, +e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Total Price */}
      <div>
        <h3>Total Price: ${totalPrice}</h3>
      </div>
    </div>
  );
};

export default ShoppingCart;