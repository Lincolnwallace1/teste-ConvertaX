import { ApiProperty } from '@nestjs/swagger';

class PasswordDTO {
  @ApiProperty({ example: 'oldPassword123' })
  old: string;

  @ApiProperty({ example: 'newPassword123' })
  new: string;
}

class IUpdateUserDTO {
  @ApiProperty({ example: 'John Doe', required: false })
  fullname?: string;

  @ApiProperty({ example: 'johnDoe@gmail.com', required: false })
  email?: string;

  @ApiProperty({ type: PasswordDTO, required: false })
  password?: PasswordDTO;
}

export default IUpdateUserDTO;
