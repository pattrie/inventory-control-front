import React, { useState, useEffect } from "react";
import { apiInventory } from "../../services/api";
import { Product } from "../../components/product";
import "../../assets/global.css";
import "./styles.css";
import { AddProductButton } from "../../components/addproduct";

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storageToken = localStorage.getItem("@Auth:token");
        apiInventory.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;

        const response = await apiInventory.get("/api/v1/inventory/all");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="products-form">
      <span className="title-form" style={{color:"#333"}}> Produtos </span>
      <div className="row">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <AddProductButton onClick />
    </div>
  );
};