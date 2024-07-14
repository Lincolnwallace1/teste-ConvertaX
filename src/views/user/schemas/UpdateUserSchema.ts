import Z from 'zod';

const UpdateUserSchema = Z.object({
  fullname: Z.string().min(3).max(255).optional(),
  email: Z.string().email().optional(),
  password: Z.object({
    old: Z.string().min(6).max(255),
    new: Z.string().min(6).max(255),
  }).optional(),
});

export default UpdateUserSchema;
