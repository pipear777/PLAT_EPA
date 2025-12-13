
import { AnimatePresence, motion } from "framer-motion";
import { GlobalButton } from "../buttons";

export const ConfirmModal = ({
  title,
  content,
  onClickCancel,
  onClickConfirm,
  buttonConfirmContent,
  variant,
  isOpen, // controla si el modal está visible
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="confirm-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-epaColor1/50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          onClick={onClickCancel} // cierra al hacer click fuera
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} // evita cerrar si se hace clic dentro
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-lg shadow-lg p-6 w-96"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <p className="text-gray-600 mb-6">{content}</p>
            <div className="flex justify-end gap-2">
              <GlobalButton
                variant="modalFour"
                onClick={onClickCancel}
                className="p-1.5 w-26"
                type="button"
              >
                Cancelar
              </GlobalButton>
              <GlobalButton
                variant={variant}
                onClick={onClickConfirm}
                className="p-1.5 w-26"
              >
                {buttonConfirmContent}
              </GlobalButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
