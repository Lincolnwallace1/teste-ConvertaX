import { ApiProperty } from '@nestjs/swagger';

class UserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;
}

class InvestmentHistoryResponse {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  valueWithdrawn: number;
}

class InvestmentResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  initialDate: Date;

  @ApiProperty()
  initialValue: number;

  @ApiProperty()
  expectedValue: number;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: [InvestmentHistoryResponse] })
  history?: InvestmentHistoryResponse[];
}

class IGetInvestmentResponse {
  @ApiProperty({ type: UserResponse })
  user: UserResponse;

  @ApiProperty({ type: InvestmentResponse })
  investment: InvestmentResponse;
}

export default IGetInvestmentResponse;
