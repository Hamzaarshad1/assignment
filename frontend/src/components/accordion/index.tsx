import { FC, ReactNode } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

export const AccordionComponent: FC<{
  children: ReactNode;
  handleOpen: () => void;
}> = ({ children, handleOpen }) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        Accordion Actions
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
      <AccordionActions>
        <Button onClick={handleOpen}>Submit</Button>
      </AccordionActions>
    </Accordion>
  );
};
