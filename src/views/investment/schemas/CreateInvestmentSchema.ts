import Z from 'zod';

const CreateInvestmentSchema = Z.object({
  user: Z.number(),
  name: Z.string().min(3).max(255),
  initialValue: Z.number(),
  initialDate: Z.string(),
});

export default CreateInvestmentSchema;
