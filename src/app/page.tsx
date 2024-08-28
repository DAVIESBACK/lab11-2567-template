"use client";
import { useState, useEffect } from "react";

export default function RegisterForm() {
  const [fname, setFname] = useState("");
  const [fnameError, setFnameError] = useState(false);
  const [lname, setLname] = useState("");
  const [lnameError, setLnameError] = useState(false);
  const [plan, setPlan] = useState("");
  const [planError, setPlanError] = useState(false);
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState(false);
  const [buyBottle, setBuyBottle] = useState(false);
  const [buyShoes, setBuyShoes] = useState(false);
  const [buyCap, setBuyCap] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [totalPayment, setTotalPayment] = useState(0);


  useEffect(() => {
    let total = 0;
    if (plan === "funrun") total += 500;
    if (plan === "mini") total += 800;
    if (plan === "half") total += 1200;
    if (plan === "full") total += 1500;
    if (buyBottle) total += 200;
    if (buyShoes) total += 600;
    if (buyCap) total += 400;

    const allItemsSelected = buyBottle && buyShoes && buyCap;
    if (allItemsSelected) {
      total = total * 0.8; 
    }

    setTotalPayment(total);
  }, [plan, buyBottle, buyShoes, buyCap]);

  const registerBtnOnClick = () => {
    let valid = true;

    if (fname === "") {
      setFnameError(true);
      valid = false;
    }
    if (lname === "") {
      setLnameError(true);
      valid = false;
    }
    if (plan === "") {
      setPlanError(true);
      valid = false;
    }
    if (gender === "") {
      setGenderError(true);
      valid = false;
    }

    if (valid) {
      alert(
        `Registration complete. Please pay ${totalPayment.toLocaleString()} THB.`
      );
    }
  };

  return (
    <div className="mx-auto vstack gap-3" style={{ width: "400px" }}>
      <h3 className="text-center fst-italic my-4">Register CMU Marathon 🏃‍♂️</h3>

      {/* First name & Last name */}
      <div className="d-flex gap-2">
        <div>
          <label className="form-label">First name</label>
          <input
            className={"form-control" + (fnameError ? " is-invalid" : "")}
            onChange={(e) => {
              setFnameError(false);
              setFname(e.target.value);
            }}
            value={fname}
          />
          <div className="invalid-feedback">Invalid first name</div>
        </div>
        <div>
          <label className="form-label">Last name</label>
          <input
            className={"form-control" + (lnameError ? " is-invalid" : "")}
            onChange={(e) => {
              setLnameError(false);
              setLname(e.target.value);
            }}
            value={lname}
          />
          <div className="invalid-feedback">Invalid last name</div>
        </div>
      </div>

      {/* Running Plan */}
      <div>
        <label className="form-label">Plan</label>
        <select
          className={"form-select" + (planError ? " is-invalid" : "")}
          onChange={(e) => {
            setPlanError(false);
            setPlan(e.target.value);
          }}
          value={plan}
        >
          <option value="">Please select..</option>
          <option value="funrun">Fun run 5.5 Km (500 THB)</option>
          <option value="mini">Mini Marathon 10 Km (800 THB)</option>
          <option value="half">Half Marathon 21 Km (1,200 THB)</option>
          <option value="full">Full Marathon 42.195 Km (1,500 THB)</option>
        </select>
        <div className="invalid-feedback">Please select a Plan</div>
      </div>

      {/* Gender */}
      <div>
        <label className="form-label">Gender</label>
        <div>
          <input
            className="me-2 form-check-input"
            type="radio"
            onChange={() => {
              setGenderError(false);
              setGender("male");
            }}
            checked={gender === "male"}
          />
          Male 👨
          <input
            className="mx-2 form-check-input"
            type="radio"
            onChange={() => {
              setGenderError(false);
              setGender("female");
            }}
            checked={gender === "female"}
          />
          Female 👩
          {genderError && <div className="text-danger">Please select gender</div>}
        </div>
      </div>

      {/* Extra Items */}
      <div>
        <label className="form-label">Extra Item(s)</label>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => setBuyBottle(e.target.checked)}
            checked={buyBottle}
          />{" "}
          <label className="form-check-label">Bottle 🍼 (200 THB)</label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => setBuyShoes(e.target.checked)}
            checked={buyShoes}
          />{" "}
          <label className="form-check-label">Shoes 👟 (600 THB)</label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => setBuyCap(e.target.checked)}
            checked={buyCap}
          />{" "}
          <label className="form-check-label">Cap 🧢 (400 THB)</label>
        </div>
      </div>

      {buyBottle && buyShoes && buyCap && (
        <div className="alert alert-success" role="alert">
          20% Discount Applied
        </div>
      )}

      {/* Total Payment */}
      <div>
        Total Payment : {totalPayment.toLocaleString()} THB
      </div>

      {/* Terms and conditions */}
      <div>
        <input
          className="me-2"
          type="checkbox"
          onChange={(e) => setAgreed(e.target.checked)}
          checked={agreed}
        />
        I agree to the terms and conditions
      </div>

      {/* Register Button */}
      <button
        className="btn btn-success my-2"
        onClick={registerBtnOnClick}
        disabled={!agreed}
      >
        Register
      </button>
    </div>
  );
}
