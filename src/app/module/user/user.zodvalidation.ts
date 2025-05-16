import z from 'zod';
const createUser = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),
  status: z.enum(["ACTIVE", "BlOCKED"]).optional(),
  bloodType: z.enum([
    "A_POSITIVE",
    "B_POSITIVE",
    "A_NEGATIVE",
    "B_NEGATIVE",
    "AB_POSITIVE",
    "AB_NEGATIVE",
    "O_POSITIVE",
    "O_NEGATIVE",
  ]),

  location: z.string(),
});


const UpdateImage = z.object({
  image: z.string().url().optional(),
});

const UpdateContactInfo = z.object({
  number: z.string().optional(),
  homeAddress: z.string().optional(),
  currentAddress: z.string().optional(),
});

const UdpateRoleInfo = z.object({
  FatherName: z.string().optional(),
  FatherNumber: z.string().optional(),
  NIDNumber: z.string().optional(),
  NIDFront: z.string().url().optional(),
  NIDBack: z.string().url().optional(),
});

export const userValidation = {
  createUser,
  UpdateImage,
  UpdateContactInfo,
  UdpateRoleInfo,
}; 