import React, { useState } from "react";
import { apiInventory } from "../../services/api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const EditProduct = ({ product, refreshWindow }) => {
  const [show, setShow] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    sku: product.sku,
    name: product.name,
    description: product.description,
    color: product.color,
    unitaryValue: product.unitaryValue,
    category: product.category,
    supplier: product.supplier,
    storagePlaces: product.storagePlaces,

    /* Formato de dados específicos - Início */

    // "category": {
    //   "name": "camiseta"
    // },
    // "supplier": {
    //   "name": "fornecedor2",
    //   "cnpj": "8888867890"
    // },
    // "storagePlaces": [
    //   {

    //       "quantity": 15,
    //       "address": {
    //       "zipcode": "12345-678",
    //       "street": "Rua Rua2",
    //       "number": "2",
    //       "city": "São Paulo",
    //       "neighborhood": "Bairro Bairro2",
    //       "state": "SP",
    //       "country": "Brasil"
    //     }
    //   }
    // ]

    /*Formato de dados específicos - Fim */
  });

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const storageToken = localStorage.getItem("@Auth:token");
      apiInventory.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storageToken}`;

      const response = await apiInventory.put(
        `/api/v1/inventory/${product.id}`,
        editedProduct
      );

      if (response.status === 200) {
        alert("Produto atualizado com sucesso!");
        refreshWindow();
        handleClose();
      }
    } catch (error) {
      alert("Erro ao atualizar produto!");
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
