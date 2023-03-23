/** @format */

import React, { useRef, useState } from "react";
import "./App.css";
import axios from "./axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
function App() {
  const [numberOfCustomers, setNumberOfCustomers] = useState("unlimited");
  const [usagePerCustomer, setUsagePerCustomer] = useState("unlimited");

  const OfferCodeRef = useRef();
  const OfferTitleRef = useRef();
  const OfferDescriptionRef = useRef();
  const OfferTypeRef = useRef();
  const OfferDiscountperRef = useRef();
  const OfferApplicableRef = useRef();
  const MinOrderValueRef = useRef();
  const MaxDiscountRef = useRef();
  const StartDateRef = useRef();
  const ExpirationDateRef = useRef();
  const NumberOfCustomersRef = useRef();
  const TotalCustomersRef = useRef();
  const OfferUsePerCustomerRef = useRef();
  const UsagePerCustomerRef = useRef();
  const handleButtonClick = (event) => {
    const clickedButtonValue = event.target.innerText.toLowerCase();
    console.log(clickedButtonValue);
    setNumberOfCustomers(clickedButtonValue);
  };
  const usagePerCustomerButtonClick = (event) => {
    const buttonValue = event.target.innerText.toLowerCase();

    setUsagePerCustomer(buttonValue);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const offer = {
      offerCode: OfferCodeRef.current.value,
      offerTitle: OfferTitleRef.current.value,
      offerDescription: OfferDescriptionRef.current.value,
      offerType: OfferTypeRef.current.value,
      discountPercentage: OfferDiscountperRef.current.value,
      applicableOn: OfferApplicableRef.current.value,
      minOrderValue: MinOrderValueRef.current.value,
      maxDiscount: MaxDiscountRef.current.value,
      startDate: StartDateRef.current.value,
      expirationDate: ExpirationDateRef.current.value,
      numberOfCustomers: numberOfCustomers,
      totalCustomers: TotalCustomersRef.current.value,
      usePerCustomers:usagePerCustomer,
      usagePerCustomers: UsagePerCustomerRef.current.value,
    };

    try {
      await axios.post("/offers", offer);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='App'>
      <h1>Create Offer</h1>
      <form>
        <div className='form__input'>
          <div className='input-group'>
            <label className='input-group__label'>Offer Code *</label>
            <input
              type='text'
              maxLength={8}
              required
              ref={OfferCodeRef}
              className='input-group__item'
            />
            <label className='input-group__label'>Offer Title *</label>
            <input
              type='text'
              maxLength={60}
              required
              ref={OfferTitleRef}
              className='input-group__item'
            />
          </div>
        </div>

        <div className='form__input'>
        <div className='input-group'>
        <label className='input-group__label'>Offer Description *</label>
          <input
            type='text'
            maxLength={140}
            style={{ marginRight: "10px" }}
            ref={OfferDescriptionRef}
          ></input>
          
           <label className='input-group__label'>Applicable on*</label>
          <select ref={OfferApplicableRef}>
            <option> All Orders</option>
            <option> Orders above certain amount</option>
            <option> Select services</option>
          </select>
        </div>
        </div>
        <div className='form__input'>
          <div className='input-group'>
            <label className='input-group__label'>Offer Type*</label>
            <select ref={OfferTypeRef} required>
              <option> Percentage discount</option>
              <option> Flat discount</option>
              <option> Free Gift</option>
            </select>

            <label className='input-group__label'>Discount % *</label>
            <input
              type='text'
              style={{ marginRight: "10px" }}
              required
              ref={OfferDiscountperRef}
            ></input>
          </div>
        </div>
       

        <div className='form__input'>
          <div className='input-group'>
            <label className='input-group__label'>Minimum order value *</label>
            <input
              type='number'
              style={{ marginRight: "10px" }}
              required
              min='0'
              ref={MinOrderValueRef}
            ></input>
            <label className='input-group__label'>Maximum Discount *</label>
            <input type='number' required ref={MaxDiscountRef} min='0'></input>
          </div>
        </div>
        <div className='form__input'>
          <div className='input-group'>
            <label className='input-group__label'>Start Date *</label>
            <input
              type='date'
              style={{ marginRight: "10px" }}
              required
              ref={StartDateRef}
            ></input>
            <label className='input-group__label'>Expiration Date*</label>
            <input type='date' ref={ExpirationDateRef}></input>
          </div>
        </div>
        <div className='form__input'>
          <div className='input-group'>
            <label className='input-group__label'>Number of customers </label>
            <ButtonGroup
              aria-label='Basic example'
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Button
                ref={NumberOfCustomersRef}
                variant='secondary'
                onClick={handleButtonClick}
              >
                Limited
              </Button>
              <Button ref={NumberOfCustomersRef} onClick={handleButtonClick}>
                Unlimited
              </Button>
            </ButtonGroup>

            {numberOfCustomers === "limited" && (
              <>
                <label className='input-group__label'>Total customers</label>
                <input type='number'  ref={TotalCustomersRef}></input>
              </>
            )}
          </div>
        </div>
        <div className='form__input'>
          <div className='input-group'>
            <label className='input-group__label'>Offer use per customer</label>
            <ButtonGroup
              aria-label='Basic example'
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Button
                ref={OfferUsePerCustomerRef}
                variant='secondary'
                onClick={usagePerCustomerButtonClick}
              >
                Limited
              </Button>
              <Button
                ref={OfferUsePerCustomerRef}
                onClick={usagePerCustomerButtonClick}
              >
                Unlimited
              </Button>
            </ButtonGroup>
            {usagePerCustomer === "limited" && (
              <>
                <label className='input-group__label'>Usage per customer</label>
                <input type='number' required ref={UsagePerCustomerRef}></input>
              </>
            )}
          </div>
        </div>
        <div className='btn'>
          <button type='submit' onClick={handleClick}>
            Create Offer
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
