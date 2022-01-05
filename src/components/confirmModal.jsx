import "../styles/confirm.scss";

const ConfirmModal = ({ closeConfirm, handleDelete }) => {
  return (
    <>
      <div className="overlay-sm">
        <div className="main-sm">
          <h1> Are you sure you wanna delete ? </h1>
          <span>
            <button onClick={handleDelete}> Yes</button>
            <button onClick={closeConfirm}> No</button>
          </span>
          <i className="fas fa-times" onClick={closeConfirm}></i>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
