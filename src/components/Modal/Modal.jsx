import { Accordion, Container } from "react-bootstrap";
import style from "./Modal.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({ show, setShow, children }) => {
  const closeModel = (e) => {
    e.stopPropagation();
    setShow(false);
  };
  const showModel = (e) => {
    e.stopPropagation();
    setShow(true);
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0, transition: { duration: 0.5 } },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 250,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div onClick={closeModel} className={style.Modal}>
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={showModel}
            className={style.inner}
          >
            <Container>
              <div className={`${style.content} px-lg-5`}>
                <h4 className="mb-4 text-center"> قم باختيار ما تريد عرضه</h4>
                {children}
              </div>
            </Container>
            <div className={style.close} onClick={closeModel}>
              <IoMdCloseCircle fill="white" size={32} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
