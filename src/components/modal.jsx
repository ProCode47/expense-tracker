import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useState, useEffect } from "react/cjs/react.development";
import crypto from "crypto";
import "../styles/modal.scss";

const Modal = ({ closeModal, createTransaction, details }) => {
  const today = new Date()
  const [desc, setDesc] = useState("");
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Expense");
  const [value, setValue] = useState(today);

  useEffect(() => {
    if (details.desc !== undefined) {
      setDesc(details.desc);
      setAmount(details.amount);
      setCategory(details.category);
      setId(details.id);
      setValue(details.value);

    } else {
      const id = crypto.randomBytes(16).toString("hex");
      setId(id);
    }
  }, [details]);

  const set = {
    setDesc,
    setAmount,
    setCategory,
  };
  const handleChange = (e) => {
    set[`set${e.target.id}`](e.target.value);
  };
  const parseInfo = () => ({
    desc,
    amount,
    category,
    id,
    value
  });

  return (
    <>
      <div className="overlay">
        <div className="main main-sm">
          <h1 className="text-sm">
            {details.desc === undefined
              ? `Add new transaction`
              : `Edit Transaction`}
          </h1>
          <span className="desc-wrapper"> <span className="description col-item">
            <h2 className="text-sm"> Description</h2>
            <input
              type="text"
              className="col-item text"
              id="Desc"
              value={desc}
              onChange={handleChange}
            />
          </span>
            <span className="picker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
              </LocalizationProvider>
            </span>  
          </span>
         

          <span className="wrapper col-sm">
            <span className="amount col-item">
              <h2 className="text-sm"> Amount</h2>
              <input
                className="number"
                type="number"
                value={amount}
                id="Amount"
                onChange={handleChange}
              />
            </span>

            <span className="category col-item">
              <h2 className="text-sm"> Category </h2>
              <select
                className="type"
                id="Category"
                value={category}
                onChange={handleChange}
              >
                <option>Expense</option>
                <option>Income</option>
              </select>
            </span>
          </span>

          <button
          className="button col-item"
            onClick={() => {
              createTransaction(parseInfo());
            }}
          >
            {" "}
            <i className="fa fa-check-circle"></i> Proceed
          </button>
          <i onClick={closeModal} className="fa text-xs fa-2x fa-times"></i>
        </div>
      </div>
    </>
  );
};

export default Modal;
