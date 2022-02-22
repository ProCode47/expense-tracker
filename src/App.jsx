import "../styles/tracker.scss";
import avatar from "../assets/avatar.png";
import BarChart from "../components/chart";
import Modal from "../components/modal";
import { useState } from "react/cjs/react.development";
import HistoryItem from "../components/historyItem";
import { useEffect } from "react";
import ConfirmModal from "../components/confirmModal";

function App () {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [deleteId, setDeleteId] = useState(null);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [details, setDetails] = useState({});
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    setBalance(income - expense);
  }, [income, expense]);
  useEffect(() => {
    let totalIncome = 0;
    let totalExpenses = 0;
    historyItems.forEach((item) => {
      if (item.category === "Income") {
        totalIncome = totalIncome + parseInt(item.amount);
      } else {
        totalExpenses = totalExpenses + parseInt(item.amount);
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpenses);
  }, [historyItems, showModal]);

  const editModal = (id) => {
    setShowModal(true);
    const data = historyItems.filter((item) => item.id === id);
    setDetails(data[0]);
  };
  const handleDelete = () => {
    const data = historyItems.filter((item) => item.id !== deleteId);
    setHistoryItems(data);
    setDeleteId(null);
    setConfirmModal(false);
  };
  const confirmDelete = (id) => {
    setDeleteId(id);
    setConfirmModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const closeConfirm = () => {
    setConfirmModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const createTransaction = (data) => {
    const filter = historyItems.filter((item) => item.id === data.id);
    if (filter[0]) {
      const itemIndex = historyItems.findIndex((item) => item.id === data.id);
      historyItems[itemIndex].desc = data.desc;
      historyItems[itemIndex].amount = data.amount;
      historyItems[itemIndex].category = data.category;
      historyItems[itemIndex].value = data.value;
      setShowModal(false);
    } else {
      setHistoryItems([...historyItems, data]);
      setShowModal(false);
    }
  };
  const longDate = (value) => {
    const d = value.toString();
    const date = d.split(" ");
    const finalDate = `${date[2]} ${date[1]} ${date[3]}`;
    return finalDate;
  };
  const parseChartData = () => {
    // for expenses
    const incomeData = [   ["Day", "Amount" ]]
    const expenseData = [   ["Day", "Amount" ]]
    const income = historyItems.filter((item) => item.category === 'Income');
    income.forEach((item) =>{
      const parse = [longDate(item.value), parseInt(item.amount)]
      incomeData.push(parse)
    })
    // for income
    const expense = historyItems.filter((item) => item.category === 'Expense');
    expense.forEach((item) =>{
      const parse = [longDate(item.value), parseInt(item.amount)]
      expenseData.push(parse)
    })
    setIncomeData(incomeData)
    setExpenseData(expenseData)
    
  }

  useEffect(() => {
    parseChartData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[showModal,showConfirmModal])

  return (
    <>
      {showConfirmModal && (
        <ConfirmModal closeConfirm={closeConfirm} handleDelete={handleDelete} />
      )}
      {showModal && (
        <Modal
          closeModal={closeModal}
          createTransaction={createTransaction}
          details={details}
        />
      )}
      <header>
        {" "}
        <p>Expense Tracker</p>{" "}
        <div className="snack-bar show-sm">
          {" "}
          <span>
            {" "}
            <i className="fas fa-wallet show-sm"></i> ${balance}
          </span>{" "}
          <i onClick={openModal} className="fas fa-plus"></i>
        </div>
      </header>
      <div className="container">
        <div className="transactions extend-sm">
          <div className="finance">
            <div className="income">
              <h2> Income</h2>
              <h3> ${income}</h3>
            </div>
            <div className="expenses">
              <h2> Expenses</h2>
              <h3> ${expense}</h3>
            </div>
          </div>
          <h1> Transactions</h1>
          <div className="transaction-history">
            {historyItems.map((item, index) => (
              <HistoryItem
                desc={item.desc}
                amount={item.amount}
                category={item.category}
                id={item.id}
                value={item.value}
                editModal={editModal}
                confirmDelete={confirmDelete}
              />
            ))}
            {historyItems.length === 0 && (
              <>
                {" "}
                <h1
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "lighter",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  Whoa... Nothing to see here
                </h1>
                <p
                  style={{
                    fontWeight: "bold",
                    margin: "0px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  You haven't added any transactions yet{" "}
                </p>{" "}
              </>
            )}
          </div>
        </div>
        <div className="profile-stats hide-sm">
          <div className="profile">
            <img src={avatar} alt="avatar" />
            <span className="wrapper">
              {" "}
              <h1> Welcome Victor</h1>
              <span className="wallet">
                <span>
                  <i className="fas fa-wallet"></i> <p>${balance}</p>{" "}
                </span>
              </span>
            </span>
          </div>
          <div className="stat">
            <div className="stat-info">
              <span>
                <p>Income</p>
                <h2>${income}</h2>
              </span>
            </div>
            <div className="graph">
              <BarChart color={`rgb(79, 151, 218)`} chartData={incomeData}/>
            </div>
          </div>
          <div className="stat">
            <div className="stat-info">
              <span>
                <p>Expenses</p>
                <h2>${expense}</h2>
              </span>
            </div>
            <div className="graph">
              <BarChart color={`rgb(238, 49, 206)`} chartData={expenseData}/>
            </div>
          </div>
          <button onClick={openModal}>
            <i className="fa fa-plus"></i> Add Transaction
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
