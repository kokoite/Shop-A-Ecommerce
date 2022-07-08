import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import "./orderStatus.css";
const orderStatus = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Order Confirmed</Typography>,
      icon: <LocalGroceryStoreRoundedIcon />,
    },
    {
      label: <Typography>Quality Check</Typography>,
      icon: <CheckCircleRoundedIcon/>,
    },
    {
      label: <Typography>Order dispatched</Typography>,
      icon: <LocalShippingRoundedIcon/>,
    },
    {
        label:<Typography>Order Delivered </Typography>,
        icon:<HomeRoundedIcon/>,
    }
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default orderStatus;