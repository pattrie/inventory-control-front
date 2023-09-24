import React from "react";
import Card from "react-bootstrap/Card";
import { DeleteProduct } from "../deleproduct";
import { EditProduct } from "../editproduct";

export const Product = ({ product }) => {
  const refreshWindow = () => {
    window.location.reload();
  };

  const cardStyle = {
    backgroundColor: "#333", // Defina a cor de fundo desejada aqui
    color: "white", // Defina a cor do texto para garantir a legibilidade
  };

  return (
    <div className="col-md-3 mb-4">
      <Card style={cardStyle}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="img-fluid"
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Cor: {product.color}</Card.Text>
          <Card.Text>Valor: R$ {product.unitaryValue.toFixed(2)}</Card.Text>
            <EditProduct product={product} refreshWindow={refreshWindow} />{" "}
            <DeleteProduct product={product} refreshWindow={refreshWindow} />
        </Card.Body>
      </Card>
    </div>
  );
};
