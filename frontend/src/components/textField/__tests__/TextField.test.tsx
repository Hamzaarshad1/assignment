import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import { TextField } from "../index";
import { TextFieldProps } from "@mui/material/TextField";

type FormData = {
  title: string;
  firstName: string;
  lastName: string;
  street: string;
  zipcode: string;
  city: string;
  email: string;
  phone: string;
};

describe("TextField", () => {
  const setup = (
    props: Partial<TextFieldProps & { name: keyof FormData }> = {}
  ) => {
    const Wrapper = () => {
      const methods = useForm<FormData>();
      return (
        <FormProvider {...methods}>
          <TextField
            name="firstName"
            control={methods.control}
            rules={{ required: "This field is required" }}
            label="First Name"
            {...props}
          />
        </FormProvider>
      );
    };
    return render(<Wrapper />);
  };

  test("renders TextField with correct label", () => {
    setup();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
  });
});
