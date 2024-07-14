interface IUpdateUserDTO {
  fullname?: string;
  email?: string;
  password?: {
    old: string;
    new: string;
  };
}

export default IUpdateUserDTO;
