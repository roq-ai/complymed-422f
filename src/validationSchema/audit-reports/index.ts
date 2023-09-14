import * as yup from 'yup';

export const auditReportValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  client_id: yup.string().nullable().required(),
});
