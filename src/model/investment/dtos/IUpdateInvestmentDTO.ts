import { ApiProperty } from '@nestjs/swagger';

class IUpdateInvestmentDTO {
  @ApiProperty({ example: 200.0, required: true })
  value?: number;

  expectedValue?: number;

  status?: string;
}

export default IUpdateInvestmentDTO;
