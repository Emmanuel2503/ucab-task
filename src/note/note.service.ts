import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import type { INoteRepository } from './interfaces/note-repository.interface';

@Injectable()
export class NoteService {
  constructor(
    // Aquí inyectamos el Repositorio usando el nombre que definimos en el module
    @Inject('INoteRepository')
    private readonly noteRepository: INoteRepository,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    return this.noteRepository.create(createNoteDto);
  }

  async findAll(query: any) {
    // 1. Buscamos todas las notas en la BD
    const notes = await this.noteRepository.findAll({
      sortBy: query.sortBy, // ordenamiento
      filter: query.filter, // filtro por título
    });

    // 2. REGLA DE NEGOCIO: Quitamos el contenido de la respuesta
    // Mapeamos el array y devolvemos todo MENOS el contenido
    return notes.map((note) => {
      const { content, ...noteWithoutContent } = note;
      return noteWithoutContent;
    });
  }

  async findOne(id: string) {
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new NotFoundException(`Nota con ID ${id} no encontrada`);
    }
    // Aquí SÍ devolvemos el contenido completo [cite: 15]
    return {
      id: note.id,
      titulo: note.title,
      contenido: note.content,
      fecha_creacion: note.createdAt,
      fecha_modificacion: note.updatedAt,
    };
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.noteRepository.update(id, updateNoteDto);
    if (!updatedNote) {
      throw new NotFoundException(
        `Nota con ID ${id} no encontrada para actualizar`,
      );
    }
    return updatedNote;
  }

  async remove(ids: string[]) {
    // Aceptamos varios IDs para eliminar [cite: 22]
    const result = await this.noteRepository.delete(ids);
    if (!result) {
      throw new NotFoundException(
        'No se pudieron eliminar las notas indicadas',
      );
    }
    return { message: 'Notas eliminadas correctamente' };
  }
}
