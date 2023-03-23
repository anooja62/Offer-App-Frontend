/** @format */

import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import axios from "./axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Offerimg from "../src/assets/OfferBase.png";
function App() {
  const [offers, setOffers] = useState([]);

  const canvasRef = useRef(null);
  const [numberOfCustomers, setNumberOfCustomers] = useState("unlimited");
  const [usagePerCustomer, setUsagePerCustomer] = useState("unlimited");
  const [discountType, setDiscountType] = useState("null");
  const [showDiscountInput, setShowDiscountInput] = useState(true);
  const OfferCodeRef = useRef();
  const OfferTitleRef = useRef();
  const OfferDescriptionRef = useRef();
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
  const handleDiscountTypeChange = (e) => {
    const type = e.target.value;
    setDiscountType(type);

    if (type !== "percentage") {
      setShowDiscountInput(false);
    } else {
      setShowDiscountInput(true);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const offer = {
      offerCode: OfferCodeRef.current.value,
      offerTitle: OfferTitleRef.current.value,
      offerDescription: OfferDescriptionRef.current.value,
      offerType: discountType,
      discountPercentage: OfferDiscountperRef.current.value,
      applicableOn: OfferApplicableRef.current.value,
      minOrderValue: MinOrderValueRef.current.value,
      maxDiscount: MaxDiscountRef.current.value,
      startDate: StartDateRef.current.value,
      expirationDate: ExpirationDateRef.current.value,
      numberOfCustomers: numberOfCustomers,
      totalCustomers: TotalCustomersRef.current.value,
      usePerCustomers: usagePerCustomer,
      usagePerCustomers: UsagePerCustomerRef.current.value,
    };

    try {
      await axios.post("/offers", offer);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllOffers = async () => {
    try {
      const response = await axios.get("/all-offers");
      setOffers(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  function OfferCanvas({ offer }) {
    const canvasRef = useRef(null);
    useEffect(() => {
      if (!canvasRef.current) {
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const margin = 10;
        const boxWidth = canvas.width / 2;
        const boxHeight = 30;
        const boxX = canvas.width - boxWidth - margin;
        const boxY = margin;

        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.fillStyle = "#FF7B5F";
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 20);
        ctx.fill();

        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";

        ctx.fillText(
          offer.offerCode,
          boxX + boxWidth / 2,
          boxY + boxHeight / 2 + 5
        );

        const discountText = `GET ${offer.discountPercentage}% OFF`;

        ctx.font = "bold 18px Arial";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        const discountTextWidth = ctx.measureText(discountText).width;
        ctx.fillText(
          discountText,
          boxX + boxWidth / 2,
          boxY + boxHeight + margin + 20
        );

        ctx.font = "bold 18px Arial";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        const offerDescriptionWidth = ctx.measureText(
          offer.offerDescription
        ).width;
        const offerDescriptionX =
          boxX + boxWidth / 2 - offerDescriptionWidth / 2 + 50;

        ctx.fillText(
          offer.offerDescription,
          offerDescriptionX,
          boxY + boxHeight + margin + 50
        );
      };

      img.src = Offerimg;
    }, []);

    return (
      <canvas
        ref={canvasRef}
        id={`offerCanvas${offer._id}`}
        className='offer-canvas'
      />
    );
  }

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
            />
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
            <select
              value={discountType}
              required
              onChange={handleDiscountTypeChange}
            >
              <option value='percentage'>Percentage discount</option>
              <option value='flat'>Flat discount</option>
              <option value='gift'>Free Gift</option>
            </select>

            <div>
              {showDiscountInput && (
                <>
                  <label className='input-group__label'>Discount % *</label>
                  <input
                    type='text'
                    style={{ marginRight: "10px" }}
                    required
                    ref={OfferDiscountperRef}
                  />
                </>
              )}
            </div>
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
            />
            <label className='input-group__label'>Maximum Discount *</label>
            <input type='number' required ref={MaxDiscountRef} min='0' />
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
            />
            <label className='input-group__label'>Expiration Date*</label>
            <input type='date' ref={ExpirationDateRef} />
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
                <input type='number' ref={TotalCustomersRef}></input>
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
      <button className='btn__show__offers' onClick={getAllOffers}>
        Show all offers
      </button>
      <div className='offers'>
        {offers.map((offer) => (
          <div key={offer._id} className='offer'>
            <OfferCanvas offer={offer} offerImgSrc={Offerimg} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
