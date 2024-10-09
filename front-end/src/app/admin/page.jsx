"use client";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import { useState } from "react";

export default function Home({setProducts}) {
  const [product, setProduct] = useState({});

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/products`, options);
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data]);
    } catch {
      console.log("error");
    }

    setProduct({
      name: "",
      introduce: "",
      price: "",
      pic_url: "",
    });
    document.getElementById("my_modal_create").close();
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };
  return (
    <div className="w-full">
      <div className="container flex justify-center mt-[70px]">
        <button
          className="btn w-[300px] h-[30px] bg-green-500"
          onClick={() => document.getElementById("my_modal_create").showModal()}
        >
          Create product
        </button>
        <dialog id="my_modal_create" className="modal">
          <div className="modal-box">
            <div className="flex flex-col gap-3 mt-4">
              <input
                name="name"
                onChange={handleInputChange}
                type="text"
                placeholder="Name"
                className="w-full input input-bordered"
                value={product?.name}
              />
              <input
                name="introduce"
                onChange={handleInputChange}
                type="text"
                placeholder="Introduce"
                className="w-full input input-bordered"
                value={product?.introduce}
              />
              <input
                name="price"
                onChange={handleInputChange}
                type="text"
                placeholder="Price"
                className="w-full input input-bordered"
                value={product?.price}
              />
              <input
                name="pic_url"
                onChange={handleInputChange}
                type="text"
                placeholder="picture url"
                className="w-full input input-bordered"
                value={product?.pic_url}
              />
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={handleSubmit}>
                  Summit
                </button>
                <button className="btn ml-2">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
