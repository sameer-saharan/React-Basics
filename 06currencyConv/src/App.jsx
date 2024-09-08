import { useState } from "react";
import "./App.css";
import "./components/InputField.jsx";
import InputField from "./components/InputField.jsx";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Current Date,Month,Year Config
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate()-1);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth()+1;
  const date = currentDate.getDate();
  const finalDate = `${year}.${month}.${date}`;

  // Custom Hook - useCurrencyInfo
  const currencyInfo = useCurrencyInfo(from, finalDate);
  const options = Object.keys(currencyInfo);

  // Swapping From & To
  const currencySwap = () => {
    setFrom(to);
    setTo(from);
    // Clearing Amount Value
    setAmount(0);
  };

  // Converting (e.g. USD to INR)
  const convert = () => {
    let finalAmount = amount * currencyInfo[to];
    setConvertedAmount(finalAmount.toFixed(2));
  };

  // From & To Change w/ onCurrencyChange
  const onFromChange = (value) => {
    setFrom(value);
  };
  const onToChange = (value) => {
    setTo(value);
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center">
        <h1 className="text-6xl font-bold text-center text-yellow-400 mb-10">
          Currency Converter
        </h1>
        <div className="w-full max-w-md mx-auto rounded-xl p-2 bg-slate-200 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full pb-2">
              <InputField
                label={"From"}
                amount={amount}
                currencyOptions={options}
                selectCurrency={from}
                onAmountChange={(newAmount) => setAmount(newAmount)}
                onCurrencyChange={onFromChange}
              />
            </div>
            <div className="w-full relative">
              <button
                onClick={currencySwap}
                className="bg-blue-600 font-bold text-white rounded-lg px-2 py-1 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 hover:bg-blue-800 transition-all ease-in-out delay-100"
              >
                Swap
              </button>
            </div>
            <div className="w-full pb-2">
              <InputField
                label={"To"}
                amount={convertedAmount}
                currencyOptions={options}
                selectCurrency={to}
                onCurrencyChange={onToChange}
                amountDisable={true}
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                onClick={convert}
                className="w-1/2 bg-blue-600 rounded-lg px-2 py-2 font-bold text-white hover:bg-blue-800 transition-all ease-in-out delay-100"
              >
                Convert
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
