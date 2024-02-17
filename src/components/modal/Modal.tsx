import React, { useEffect, useState } from "react";

type ModalProps = {
  title: string;
  handleCloseModal: () => void;
  children: React.ReactNode;
};

export default function Modal(props: ModalProps) {
  const { title, handleCloseModal, children } = props;
  const [modalClose, setModalClose] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setModalClose((modalClose) => !modalClose);
  };

  const handleCloseButtonClicked = () => {
    handleClose();
    setTimeout(() => {
      handleCloseModal();
    }, 200);
  };

  return (
    <dialog
      open
      onClose={handleCloseButtonClicked}
      className="fixed inset-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-80 z-50"
    >
      <section className="relative">
        <div
          className={`sm:min-w-[500px] sm:max-h-screen sm:h-[600px] ${
            modalClose ? "animate-commonModalClose" : "animate-commonModalOpen"
          } flex h-screen w-screen flex-col overflow-auto p-5 shadow-lg shadow-sky-950 sm:h-fit sm:w-fit sm:max-w-screen-md sm:rounded-2xl bg-slate-900`}
        >
          <div className="mb-8 flex justify-between text-base font-bold subpixel-antialiased sm:text-xl text-slate-400 space-x-10">
            {title}
            <div
              className="cursor-pointer text-2xl text-slate-500"
              onClick={handleCloseButtonClicked}
            >
              &times;
            </div>
          </div>
          <div className="flex flex-grow text-left text-slate-400">
            {children}
          </div>
        </div>
      </section>
    </dialog>
  );
}
