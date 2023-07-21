import * as Yup from 'yup';

interface ISubscriptionData {
  email: string;
}

const subscribeSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Is not a valid email.'),
});

export const subscripbeValidationSchema =
  subscribeSchema as Yup.Schema<ISubscriptionData>;
