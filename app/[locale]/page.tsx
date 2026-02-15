import Products from "@/components/homepage/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage",
  description: "This is the homepage description"
}

export default function Home() {
  return (
    <main className="mycontainer">
      <Products />
    </main>
  );
}
