import { Button, Dialog } from "@mui/material";
import React from "react";
import styles from "./ConfirmationDialog.module.scss";

export interface ConfirmationDialogProps {
  open: boolean;
  heading: string;
  message: string;
  onAccept?: () => void;
  onReject?: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  const { open, heading, message, onAccept, onReject } = props;
  return (
    <>
      <Dialog open={open}>
        <div className={styles["container"]}>
          <header>{heading}</header>
          <p>{message}</p>
          <div className={styles["actions"]}>
            <Button onClick={onReject} sx={{ color: "black" }}>
              No
            </Button>
            <Button variant="contained" onClick={onAccept}>
              Yes
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
