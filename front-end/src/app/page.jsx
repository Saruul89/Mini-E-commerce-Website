import Card from "@/components/card/Card";
import Cart from "@/components/cart/Order";
import ListProduct from "@/components/list-product/ListProduct";

export default function Home() {
  return (
    <div className="w-full">
      <div className="container m-auto">
        <ListProduct />
        <Card />
      </div>
    </div>
  );
}
