import React, { useState } from "react";
import { apiInventory } from "../../services/api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../assets/global.css";

export const DeleteProduct = ({ product, refreshWindow }) => {
  const [show, setShow] = useState(false);

  const handleRemoveClick = () => {
    setShow(true);
  };

  const handleConfirmRemove = async () => {
    try {
      const storageToken = localStorage.getItem("@Auth:token");
      apiInventory.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storageToken}`;

      const response = await apiInventory.delete(`/api/v1/inventory/${product.id}`);

      if (response.status === 204) {
        alert("Produto excluído com sucesso!");
        refreshWindow();
      }
    } catch (error) {
      alert("Erro ao deletar produto!");
    }
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Button variant="danger" onClick={handleRemoveClick}>
        Remover
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="title-form">Remover Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Gostaria de realmente excluir o produto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmRemove}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
