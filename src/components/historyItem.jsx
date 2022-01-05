import { useEffect, useState } from "react";

const HistoryItem = ({
  desc,
  amount,
  category,
  id,
  editModal,
  confirmDelete,
  value,
}) => {
  const [date, setDate] = useState("");
  const handleClick = (e) => {
    const actions = document.getElementById(`content${e.target.id}`);
    const icon = document.getElementById(`${e.target.id}`);
    actions.classList.contains("show")
      ? actions.classList.remove("show")
      : actions.classList.add("show");

    icon.classList.contains("rotate")
      ? icon.classList.remove("rotate")
      : icon.classList.add("rotate");
  };
  const longDate = (value) => {
    const d = value.toString();
    const date = d.split(" ");
    const finalDate = `${date[2]} ${date[1]} ${date[3]}`;
    return finalDate;
  };

  useEffect(() => {
    setDate(longDate(value));
  }, [value]);

  return (
    <>
      <div
        className={`transaction-item ${
          category === "Income" ? "income" : "expense"
        }`}
      >
        <span className="desc">
          <i
            className={` fas  fa-${
              category === "Income"
                ? "hand-holding-usd in"
                : "money-bill-wave out"
            } icon`}
          ></i>
          <span className="desc-wrapper">
            <p> {desc}</p>
            <p className="date">{date}</p>
          </span>
        </span>

        <span className="wrapper">
          <span className="collapse">
            {" "}
            <p className="transaction-amount"> ${amount}</p>
            <i className="fas fa-angle-down" onClick={handleClick} id={id}>
              {" "}
            </i>
          </span>
          <div class="content" id={`content${id}`}>
            <span onClick={() => editModal(id)}>
              <i className="fas fa-pencil-alt"></i> Edit
            </span>
            <span onClick={() => confirmDelete(id)}>
              <i className="fas fa-trash-alt"></i> Delete
            </span>
          </div>
        </span>
      </div>
    </>
  );
};

export default HistoryItem;
