import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const ModalComponent = ({
  open,
  onClose,
  handleClose,
  handleSubmit,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  handleClose: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  onSubmit: (data: any) => void;
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: 400,
        }}
      >
        <h2 id="parent-modal-title">Are you sure for changes?</h2>
        <Button
          variant="outlined"
          color="error"
          onClick={handleSubmit(onSubmit)}
        >
          Confirm
        </Button>{" "}
        &nbsp;
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};
