import { ApiProperty } from '@nestjs/swagger';

export class UrlResponseDto {
  @ApiProperty({
    description: 'The URL returned by the API',
    example: 'https://www.example.com',
    type: 'string',
    format: 'url',
  })
  url!: string;
}
