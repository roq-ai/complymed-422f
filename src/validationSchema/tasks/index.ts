import * as yup from 'yup';

export const taskValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  status: yup.string().required(),
  client_id: yup.string().nullable().required(),
});
