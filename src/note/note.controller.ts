import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('Notes') // Esto agrupa los endpoints en Swagger
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva nota' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener listado general (Sin contenido)' })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['title', 'createdAt', 'updatedAt'],
  })
  findAll(@Query('sortBy') sortBy?: string) {
    return this.noteService.findAll({ sortBy });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una nota específica (Con contenido)' })
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar título o contenido de una nota' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(id, updateNoteDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Eliminar una o varias notas' })
  @ApiBody({ schema: { example: { ids: ['65a1b2c3d4e5f6...', '65a1b...'] } } })
  remove(@Body('ids') ids: string[]) {
    return this.noteService.remove(ids);
  }
}
