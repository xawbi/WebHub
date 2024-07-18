import React from 'react';
import {Chip} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {Link} from "react-router-dom";

const ButtonBack = () => {
  return (
    <Link to={'/'}>
      <Chip icon={<ArrowBackIosIcon fontSize={"small"}/>} label="Back"
            sx={{
              fontSize: 16,
              position: 'fixed',
              margin: '10px 0 0 10px',
              border: '1px solid grey',
              top: 0,
              '&:hover': {
                cursor: 'pointer',
                background: '#09091A'
              }
            }}/>
    </Link>
  );
};

export default ButtonBack;