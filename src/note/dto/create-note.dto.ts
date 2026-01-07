import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    description: 'El título de la nota',
    example: 'Comprar comida',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'El contenido principal de la nota',
    example: 'Leche, Huevos, Pan',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
