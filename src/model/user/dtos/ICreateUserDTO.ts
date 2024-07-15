import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

class ICreateUserDTO {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: 'johnDoe@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  password: string;
}

export default ICreateUserDTO;
