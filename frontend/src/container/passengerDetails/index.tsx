import { useEffect, useState } from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import { AccordionComponent, TextField } from '../../components';
import { Container, FieldWrapper } from './styled';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { ModalComponent } from '../../components';
import {
  getPassengerById,
  updatePassenger,
} from '../../service/passenger.service';
import { useParams } from 'react-router-dom';
import { useContextHook } from '../../hooks/useContext';

export function Details() {
  const [open, setOpen] = useState(false);
  const { passengerId } = useParams();
  const { data, setData, setLoading, setError } = useContextHook();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      firstName: '',
      lastName: '',
      street: '',
      zipcode: '',
      city: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPassengerById(passengerId as string);
        reset({
          title: data.title || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          street: data.street || '',
          zipcode: data.zipcode || '',
          city: data.city || '',
          email: data.email || '',
          phone: data.phone || '',
        });
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [passengerId, reset]);

  const onSubmit = (data: any) => {
    try {
      setLoading(true);
      updatePassenger(passengerId as string, data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred while updating the data'
      );
      console.error('Error updating passenger:', error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleOpen = async () => {
    const isValid = await trigger();
    if (isValid) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AccordionComponent handleOpen={handleOpen}>
          <h3>Edit Invoice Details</h3>
          <FieldWrapper>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <FormControl variant="standard" sx={{ minWidth: 160 }}>
                  <InputLabel id="title-label">title</InputLabel>
                  <Select
                    {...field}
                    labelId="title-label"
                    id="title"
                    label="Title"
                    error={!!errors.title}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="MR">MR</MenuItem>
                    <MenuItem value="MRS">MRS</MenuItem>
                    <MenuItem value="DR">DR.</MenuItem>
                  </Select>
                  {errors.title && (
                    <span style={{ color: 'red' }}>
                      {String(errors.title.message)}
                    </span>
                  )}
                </FormControl>
              )}
            />
            <TextField
              id="firstName"
              name="firstName"
              control={control}
              rules={{ required: 'First name is required' }}
              label="Firstname"
              variant="standard"
              error={!!errors.firstName}
              helperText={
                errors.firstName ? String(errors.firstName.message) : ''
              }
            />
            <TextField
              id="lastName"
              name="lastName"
              control={control}
              rules={{ required: 'Last name is required' }}
              label="Lastname"
              variant="standard"
              error={!!errors.lastName}
              helperText={
                errors.lastName ? String(errors.lastName.message) : ''
              }
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              id="street"
              name="street"
              control={control}
              rules={{ required: 'Street is required' }}
              label="Street"
              variant="standard"
              error={!!errors.street}
              helperText={errors.street ? String(errors.street.message) : ''}
            />
            <TextField
              id="zipcode"
              name="zipcode"
              control={control}
              rules={{
                required: 'zipcode is required',
                validate: (value: string) => {
                  const isValidZipcode = /^\d{5}$/.test(value);
                  return isValidZipcode || 'Invalid zipcode';
                },
              }}
              label="Zipcode"
              variant="standard"
              error={!!errors.zipcode}
              helperText={errors.zipcode ? String(errors.zipcode.message) : ''}
            />
            <TextField
              id="city"
              name="city"
              control={control}
              rules={{ required: 'City is required' }}
              label="City"
              variant="standard"
              error={!!errors.city}
              helperText={errors.city ? String(errors.city.message) : ''}
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              id="email"
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              }}
              label="Email"
              variant="standard"
              error={!!errors.email}
              helperText={errors.email ? String(errors.email.message) : ''}
            />
            <TextField
              id="phone"
              name="phone"
              control={control}
              rules={{
                required: 'Phone is required',
                validate: (value: string) => {
                  const isValidPhoneNumber = /^\d{12}$/.test(value);
                  return isValidPhoneNumber || 'Invalid phone number';
                },
              }}
              label="Phone"
              variant="standard"
              error={!!errors.phone}
              helperText={errors.phone ? String(errors.phone.message) : ''}
            />
          </FieldWrapper>
        </AccordionComponent>
        <ModalComponent
          open={open}
          onClose={handleClose}
          onSubmit={onSubmit}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </form>
    </Container>
  );
}
