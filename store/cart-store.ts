import { ICartItem } from "@/lib/cart/types";
import { IProduct } from "@/lib/product/types";
import { create } from "zustand";
import products from "../lib/product/data.json";

interface CartStore {
  items: ICartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: products.slice(0, 4).map((product) => ({
    id: Math.random().toString(),
    product,
    quantity: 1,
  })),
  addToCart: (product) => {
    const cartItems = get().items;
    const existing = cartItems.find((item) => item.product.id === product.id);
    console.log(product)
    if (existing)
      set({
        items: cartItems.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    else set({ items: [...cartItems, { id: Math.random().toString(), product, quantity: 1 }] });
  },
  removeFromCart: (productId) => {
    set({ items: get().items.filter(item => item.product.id !== productId) })
  },
  updateQuantity: (productId, quantity) => {
    set({ items: get().items.map(item => item.product.id === productId ? { ...item, quantity } : item) })
  }
}));
