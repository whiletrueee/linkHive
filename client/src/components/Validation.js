import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
  email: yup.string().email("Please provide valid email").required(),
  password: yup.string().min(6, 'Minimum 6 chars password').required()
});