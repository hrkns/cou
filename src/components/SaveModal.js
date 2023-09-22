import { Button, Form, Modal } from "react-bootstrap";

const SaveModal = ({ show, close, save, title, fileName, setFileName }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del archivo:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del archivo"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={save}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveModal;
