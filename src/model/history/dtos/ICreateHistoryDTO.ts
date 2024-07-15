import { IsNotEmpty } from 'class-validator';

class ICreateHistoryDTO {
  @IsNotEmpty()
  investment: number;

  @IsNotEmpty()
  valueWithdrawn: number;

  @IsNotEmpty()
  realValueWithdrawn: number;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  tax: number;
}

export default ICreateHistoryDTO;
