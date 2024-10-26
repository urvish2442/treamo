import React from "react";
import Modal from "react-modal";
import { CloseIcon } from "@/assets/svgs";
import { useTranslation } from "react-i18next";

const ConfirmationDialog = ({
    isOpen = false,
    onClose = () => {},
    cancelText = "cancelBtn",
    confirmText = "confirmDeleteBtn",
    confirmationText = "Are you sure you want to delete?",
    onConfirm,
    isLoading = false,
}) => {
    // ** Hooks
    const { t } = useTranslation("common");
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirmation Dialog"
            className="common-modal-block"
        >
            <div className="common-close-error-btn">
                <div className="btn-close-block">
                    <button onClick={onClose} disabled={isLoading}>
                        <CloseIcon />
                    </button>
                </div>
                <h2>{confirmationText}</h2>
                <div className="button-group">
                    <button
                        className="cancel-btn"
                        onClick={() => onClose()}
                        disabled={isLoading}
                    >
                        {t(cancelText)}
                    </button>
                    <button
                        className="fill-btn"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? t("deleting") : t(confirmText)}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationDialog;
