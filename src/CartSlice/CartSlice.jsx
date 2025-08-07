import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        id,
        img,
        title,
        price,
        newPrice,
        selectedColor,
        selectedSize,
        selectedDressSize,
        quantity,
      } = action.payload;

      const existingItem = state.cartItems.find(
        (item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          (item.selectedSize === selectedSize ||
            item.selectedDressSize === selectedDressSize)
      );

      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        state.cartItems.push({
          id,
          img,
          title,
          price: newPrice || price,
          quantity: quantity || 1,
          selectedColor,
          selectedSize,
          selectedDressSize,
          prevPrice: action.payload.prevPrice || null,
          reviews: action.payload.reviews || 0,
        });
      }
    },

    removeFromCart: (state, action) => {
      const { id, selectedColor, selectedSize, selectedDressSize } =
        action.payload;
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === selectedColor &&
            (item.selectedSize === selectedSize ||
              item.selectedDressSize === selectedDressSize)
          )
      );
    },

    increaseQuantity: (state, action) => {
      const { id, selectedColor, selectedSize, selectedDressSize } =
        action.payload;
      const item = state.cartItems.find(
        (item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          (item.selectedSize === selectedSize ||
            item.selectedDressSize === selectedDressSize)
      );
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const { id, selectedColor, selectedSize, selectedDressSize } =
        action.payload;
      const item = state.cartItems.find(
        (item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          (item.selectedSize === selectedSize ||
            item.selectedDressSize === selectedDressSize)
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;