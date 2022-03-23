import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BankLogin from "./BankLogin";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Tooltip,
  ButtonBase,
  Modal,
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { addTransactionAsyn } from "../../../../store/Transaction";
import { BankData } from "./bank_data";

// ==============================|| NOTIFICATION ||============================== //

toast.configure();

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const BankLoginSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const loginHandler = () => {
    toast("Retrieving transaction data from your DBS account ...", {autoClose: 3000});    
    // Set timeout
    sleep(3500).then( () => {
      navigate('/utils/transaction/');
      for (var i=0; i<BankData.length; i++) {
        dispatch(addTransactionAsyn(BankData[i]));
      }
      toast("Successfully connected to your DBS account!", {autoClose:500});
    })
    setIsOpen(false);
  }

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down("md")]: {
            mr: 2,
          },
        }}
      >
        <Tooltip title="Connect with bank">
          <ButtonBase sx={{ borderRadius: "12px" }} onClick={handleOpen}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: "all .2s ease-in-out",
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                '&[aria-controls="menu-list-grow"],&:hover': {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                },
              }}
              color="inherit"
            >
              <AccountBalanceIcon stroke={1.5} size="1.3rem" />
            </Avatar>
          </ButtonBase>
        </Tooltip>
      </Box>

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby={theme.typography.h1}
        aria-describedby={theme.typography.body1}
      >
        <BankLogin submitHandler={loginHandler}/>
      </Modal>
    </>
  );
};

export default BankLoginSection;
