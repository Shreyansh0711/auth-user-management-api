import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className={cn("glass w-full max-w-lg rounded-2xl p-6 pointer-events-auto", className)}
            >
              <div className="flex items-center justify-between mb-4">
                {title && <h2 className="text-xl font-semibold">{title}</h2>}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-textMuted hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <div>{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
