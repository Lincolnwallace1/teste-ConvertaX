import { ApiProperty } from '@nestjs/swagger';

class ILoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export default ILoginResponse;
