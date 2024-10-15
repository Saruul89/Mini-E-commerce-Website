"use client";
import CreateProductAdmin from "@/components/create/CreateProductAdmin";
import EditAdmin from "@/components/edit/Edit";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import { useState, useEffect } from "react";

export default function Home() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8000/products`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const responseData = await response.json();
      setProducts(responseData);
    } catch (error) {
      console.error(error);
      setError("Error occurred while fetching products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/products`, options);

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data]);

      setProduct({
        name: "",
        introduce: "",
        price: "",
        pic_url: "",
      });

      document.getElementById("my_modal_create").close();
    } catch (error) {
      console.error("Error occurred during submission:", error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      };
      const response = await fetch(
        `${BACKEND_ENDPOINT}/products/${editId}`,
        options
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((prod) => (prod.id === editId ? data : prod))
      );

      document.getElementById("my_modal_edit").close();
      setEditId(null);
      setProduct({});
    } catch (error) {
      console.error("Error occurred during edit submission:", error);
    }
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const openEditModal = (product) => {
    setProduct(product);
    setEditId(product.id);
    document.getElementById("my_modal_edit").showModal();
  };

  const handleDeleteSubmit = async (event) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${BACKEND_ENDPOINT}/products/${deleteId}`,
        options
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      // Remove the deleted product from the state
      setProducts((prevProducts) =>
        prevProducts.filter((prod) => prod.id !== deleteId)
      );
      setDeleteId(null);
    } catch (error) {
      console.error("Error occurred during delete submission:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="container flex justify-center mt-[70px] m-auto flex-col">
        <CreateProductAdmin
          handleCreateSubmit={handleCreateSubmit}
          handleInputChange={handleInputChange}
          product={product}
        />
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>introduce</th>
                <th>price</th>
                <th>pic_url</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <th>{product.id}</th>
                  <td>{product.name}</td>
                  <td>{product.introduce}</td>
                  <td>{product.price}</td>
                  <td>{product.pic_url}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => openEditModal(product)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={async () => {
                        setDeleteId(product.id); // Set the ID of the product to delete
                        await handleDeleteSubmit(); // Directly call the delete function
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <EditAdmin
          handleInputChange={handleInputChange}
          handleEditSubmit={handleEditSubmit}
          product={product}
        />
      </div>
    </div>
  );
}
