import { useContextHook } from '../../hooks/useContext';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Wrapper } from './styled';

export const Toast = () => {
  const { error, loading } = useContextHook();
  if (!loading && !error) {
    return (
      <Wrapper>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Here is a gentle confirmation that your action was successful.
          {error}
        </Alert>
      </Wrapper>
    );
  }

  if (!loading && error) {
    return (
      <Wrapper>
        <Alert severity="error">{error}</Alert>
      </Wrapper>
    );
  }

  return null;
};
