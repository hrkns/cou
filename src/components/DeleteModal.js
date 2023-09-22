import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ show, close, title, message, remove }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cerrar
        </Button>
        <Button variant="danger" onClick={remove}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
