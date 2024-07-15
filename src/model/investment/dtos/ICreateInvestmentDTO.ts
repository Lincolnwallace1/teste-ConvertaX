import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class ICreateInvestmentDTO {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  user: number;

  @ApiProperty({ example: 'google WEGE3' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 100.0 })
  @IsNotEmpty()
  initialValue: number;

  @ApiProperty({ example: '2021-04-20' })
  @IsNotEmpty()
  initialDate: string;

  expectedValue?: number;
}

export default ICreateInvestmentDTO;
