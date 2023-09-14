import * as yup from 'yup';

export const progressValidationSchema = yup.object().shape({
  task_completed: yup.number().integer().required(),
  task_total: yup.number().integer().required(),
  client_id: yup.string().nullable().required(),
});
