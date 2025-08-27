'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { AlertTriangle } from 'lucide-react'; // 'X' import removed

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }: ConfirmationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-lg shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="ml-4 text-left">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">{title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{message}</p>
                </div>
            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <Button onClick={onConfirm} variant="primary" size="sm" className="w-full sm:w-auto sm:ml-3">
                Confirm
              </Button>
              <Button onClick={onClose} variant="outline" size="sm" className="mt-3 w-full sm:w-auto sm:mt-0">
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;