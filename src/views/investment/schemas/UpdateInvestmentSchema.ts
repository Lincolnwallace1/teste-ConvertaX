import Z from 'zod';

const UpdateInvestmentSchema = Z.object({
  value: Z.number(),
});

export default UpdateInvestmentSchema;
