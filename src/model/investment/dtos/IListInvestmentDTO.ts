import { ApiProperty } from '@nestjs/swagger';

class IListInvestmentDTO {
  @ApiProperty({ example: 50 })
  limit: string;

  @ApiProperty({ example: 0 })
  offset: string;

  @ApiProperty({ example: 1 })
  user: string;

  @ApiProperty({
    example: 'active',
    enum: ['active', 'finished'],
    required: false,
  })
  status?: string;
}

export default IListInvestmentDTO;
