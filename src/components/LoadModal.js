import { Button, Form, Modal } from "react-bootstrap";

const LoadModal = ({
  show,
  close,
  load,
  title,
  items,
  fileName,
  setFileName,
  setOptionToDelete,
  setShowDeleteModal,
}) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{title} </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {items.map((option, index) => (
          <div key={index}>
            <Form.Check
              type="radio"
              value={option}
              checked={fileName === option}
              onChange={(e) => setFileName(e.target.value)}
              label={
                <span>
                  {option} &nbsp;{" "}
                  <strong
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOptionToDelete(option);
                      setShowDeleteModal(true);
                    }}
                  >
                    X
                  </strong>
                </span>
              }
            />
            &nbsp;
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={load}>
          Cargar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoadModal;
