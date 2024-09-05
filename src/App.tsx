import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { shop100Pay } from "@100pay-hq/checkout";

type PayWith100PayType = {
  name: string;
  email: string;
  phone: string;
  currency: string;
  amount: number;
};

const payWith100Pay = ({
  name,
  email,
  phone,
  currency,
  amount,
}: PayWith100PayType) => {
  shop100Pay.setup({
    ref_id: "" + Math.floor(Math.random() * 1000000000 + 1),
    api_key:
      "LIVE;PK;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY1ZjljZjVhZTZjNTdlMDAyZDc5NmM1NiIsInVzZXJJZCI6IjY1ZjljZjVhZTZjNTdlMDAyZDc5NmM1MiIsImlhdCI6MTcxMDg3MDM2Mn0.l-XuOcbxZWBdRAVt5Mzz1v97uRSB40K3xrrGaSHg4N0", // paste api key here
    customer: {
      user_id: "1", // optional
      name: name,
      phone,
      email,
    },
    billing: {
      amount: amount,
      currency: currency, // or any other currency supported by 100pay
      description: "Test Payment",
      country: "USA",
      vat: 10, //optional
      pricing_type: "fixed_price", // or partial
    },
    metadata: {
      is_approved: "yes",
      order_id: "OR2", // optional
      charge_ref: "REF", // optionalm, you can add more fields
    },
    call_back_url: "http://localhost:8000/verifyorder/",
    onClose: () => {
      alert("You just closed the crypto payment modal.");
    },
    onPayment: (reference) => {
      alert(`New Payment detected with reference ${reference}`);
      /**
       * @dev ⚠️ never give value to the user because you received a callback.
       * Always verify payments by sending a get request to 100Pay Get Crypto Charge endpoint on your backend.
       * We have written a well detailed article to guide you on how to do this. Check out the link below.
       * 👉 https://100pay.co/blog/how-to-verify-crypto-payments-on-100-pay
       * */
    },
    onError: (error) => {
      // handle your errors, mostly caused by a broken internet connection.
      console.log(error);
      alert("Sorry something went wrong pls try again.");
    },
    callback: (response) => {
      console.log(response);
    },
  });
};

function App() {
  // const [count, setCount] = useState(0);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const data = Object.fromEntries(values);
    console.log(data);
    payWith100Pay(data as unknown as PayWith100PayType);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          {/* name */}
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>

          {/* email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          {/* phone */}
          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          {/* currency */}
          <div className="input-group">
            <label htmlFor="currency">Currency</label>
            <select name="currency" id="currency">
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
            </select>
          </div>
          {/* amount */}
          <div className="input-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" />
          </div>

          <div className="action-cont">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>{" "}
      {/* <div id="show100Pay"></div> */}
    </>
  );
}

export default App;
