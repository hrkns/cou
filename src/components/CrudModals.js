import React, { useState } from "react";
import SaveModal from "./SaveModal";
import LoadModal from "./LoadModal";
import DeleteModal from "./DeleteModal";
import { Button } from "react-bootstrap";
import { getItem, setItem } from "../shared/db";

const CrudModals = ({
  currentItem,
  storageKey,
  saveModalTitle,
  loadModalTitle,
  deleteModalTitle,
  deleteModalMessage,
  itemSaver,
}) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  const [fileName, setFileName] = useState("");
  const [optionToDelete, setOptionToDelete] = useState("");
  const handleCloseSaveModal = () => {
    setShowSaveModal(false);
  };
  const handleCloseLoadModal = () => {
    setShowLoadModal(false);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleSave = () => {
    if (fileName?.trim().length === 0) return;
    const saved = getItem("saved") || {};
    saved[storageKey] = saved[storageKey] || {};
    saved[storageKey][fileName] = currentItem;
    setItem("saved", saved);
    setShowSaveModal(false);
  };
  const handleLoad = () => {
    if (fileName?.trim().length === 0) return;
    const saved = getItem("saved") || {};
    saved[storageKey] = saved[storageKey] || {};
    const item = saved[storageKey][fileName];
    if (!item) {
      alert("No existe el elemento guardado");
      return;
    }
    itemSaver(item);
    setShowLoadModal(false);
  };
  const handleDelete = () => {
    const saved = getItem("saved") || {};
    saved[storageKey] = saved[storageKey] || {};
    delete saved[storageKey][optionToDelete];
    setItem("saved", saved);
    setShowDeleteModal(false);
    updateSavedItems();
  };
  const updateSavedItems = () => {
    const saved = getItem("saved") || {};
    const storage = saved[storageKey] || {};
    const itemsKeys = Object.keys(storage);
    const ret = itemsKeys.length > 0;
    if (!ret) {
      alert("No hay elementos guardados");
    }
    setSavedItems(itemsKeys);
    return ret;
  };

  return (
    <>
      <Button variant="success" onClick={() => setShowSaveModal(true)}>
        Guardar
      </Button>
      &nbsp;
      <Button
        variant="info"
        onClick={() => {
          setShowLoadModal(updateSavedItems());
        }}
      >
        Cargar
      </Button>
      <SaveModal
        show={showSaveModal}
        close={handleCloseSaveModal}
        save={handleSave}
        title={saveModalTitle}
        fileName={fileName}
        setFileName={setFileName}
      />
      <LoadModal
        show={showLoadModal}
        close={handleCloseLoadModal}
        load={handleLoad}
        title={loadModalTitle}
        items={savedItems}
        fileName={fileName}
        setFileName={setFileName}
        setOptionToDelete={setOptionToDelete}
        setShowDeleteModal={setShowDeleteModal}
      />
      <DeleteModal
        show={showDeleteModal}
        close={handleCloseDeleteModal}
        title={deleteModalTitle}
        message={deleteModalMessage}
        remove={handleDelete}
      />
    </>
  );
};

export default CrudModals;
