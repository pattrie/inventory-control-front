import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./styles.css";
import { apiInventory } from "../../services/api";

export const AddProductButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    sku: "",
    name: "",
    description: "",
    color: "",
    unitaryValue: "",
    category: {
      name: "camiseta",
    },
    supplier: {
      name: "fornecedor2",
      address: null,
      cnpj: "8888867890",
      phone: null,
      email: null,
    },
    storagePlaces: [
      {
        quantity: 15,
        address: {
          zipcode: "12345-678",
          street: "Rua Rua2",
          number: "2",
          city: "São Paulo",
          neighborhood: "Bairro Bairro2",
          state: "SP",
          country: "Brasil",
        },
      },
    ],
  });

  const refreshWindow = () => {
    window.location.reload();
  };

  const handleButtonClick = () => {
    console.log("Botão de adição de produto clicado!");
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCreate = async () => {
    try {
      const storageToken = localStorage.getItem("@Auth:token");
      apiInventory.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storageToken}`;

      const response = await apiInventory.post(
        `/api/v1/inventory`,
        JSON.stringify(editedProduct),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Produto atualizado com sucesso!");
        refreshWindow();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar produto!");
    }
  };

  const handleConfirm = () => {
    if (
      !editedProduct.name ||
      !editedProduct.description ||
      !editedProduct.color ||
      !editedProduct.unitaryValue
    ) {
      alert("Todos os campos são obrigatórios!");
      return;
    } else {
      handleCreate();
      setShowModal(false);
      refreshWindow();
    }
  };

  return (
    <>
      <div className="add-product-button" onClick={handleButtonClick}>
        <Button
          variant="success"
          size="lg"
          className="round-button"
          style={{ "borderRadius": "50%" }}
        >
          +
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="title-form">Adicionar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Formulário de edição com campos para name, description, color, unitaryValue */}
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome do Produto</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">SKU</label>
              <input
                type="text"
                className="form-control"
                id="sku"
                name="sku"
                value={editedProduct.sku}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="color">Cor</label>
              <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                value={editedProduct.color}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="unitaryValue">Valor Unitário</label>
              <input
                type="number"
                className="form-control"
                id="unitaryValue"
                name="unitaryValue"
                value={editedProduct.unitaryValue}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>{" "}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
