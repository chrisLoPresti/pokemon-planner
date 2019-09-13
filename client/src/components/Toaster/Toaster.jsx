import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

let toastId = null;

const notify = message => {
  let toastIdToDismiss = null;
  if (toastId) {
    return;
  }
  if (toastId) {
    toastIdToDismiss = toastId;
  }

  const id = toast.error(message, {
    autoClose: 3000,
    onClose: () => (toastId = null),
    onOpen: () => {
      if (toastIdToDismiss !== null) {
        setTimeout(() => {
          toast.dismiss(toastIdToDismiss);
        }, 1000);
      }
    }
  });
  toastId = id;
};
const Toaster = ({ message }) => {
  if (message && message.length > 0) {
    notify(message);
  }
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={true}
      draggable={false}
      rtl={false}
    />
  );
};

Toaster.defualtProps = {
  message: ''
};

Toaster.propTypes = {
  message: PropTypes.string
};

export default Toaster;
