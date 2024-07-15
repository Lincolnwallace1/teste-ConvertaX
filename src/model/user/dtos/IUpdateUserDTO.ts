import { ApiProperty } from '@nestjs/swagger';

class IUpdateUserDTO {
  @ApiProperty({ example: 'John Doe', required: false })
  fullname?: string;

  @ApiProperty({ example: 'johnDoe@gmail.com', required: false })
  email?: string;

  @ApiProperty({ example: 'newPassword', required: false })
  password?: string;

  enabled?: boolean;
}

export default IUpdateUserDTO;
