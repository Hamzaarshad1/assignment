import { FC, ReactNode } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { StyledAccordionActions } from './styled';

export const AccordionComponent: FC<{
  children: ReactNode;
  handleOpen: () => void;
}> = ({ children, handleOpen }) => {
  const navigate = useNavigate();
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        <h2>Contact Details</h2>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
      <StyledAccordionActions>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back
        </Button>
        <Button variant="contained" onClick={handleOpen}>
          Next
        </Button>
      </StyledAccordionActions>
    </Accordion>
  );
};
