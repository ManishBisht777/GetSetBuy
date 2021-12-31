import React from "react";
import { Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./checkoutsteps.css";

const Checkoutsteps = ({ activesteps }) => {
  const steps = [
    {
      label: <h3>Shipping Details</h3>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <h3>Confirm Order</h3>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <h3>Payment</h3>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <div>
      <Stepper alternativeLabel activeStep={activesteps} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activesteps === index ? true : false}
            completed={activesteps >= index ? true : false}
          >
            <StepLabel
              style={{
                color:
                  activesteps >= index
                    ? "rgb(113 131 201)"
                    : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default Checkoutsteps;
