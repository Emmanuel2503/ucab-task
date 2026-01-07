import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Note } from '../entities/note.entity';

// Definimos los parámetros para filtrar/ordenar (requisito del endpoint 1)
export interface FindAllParams {
  limit?: number;
  offset?: number;
  sortBy?: 'title' | 'createdAt' | 'updatedAt'; // Requisito
}

export interface INoteRepository {
  create(createNoteDto: CreateNoteDto): Promise<Note>;
  findAll(params?: FindAllParams): Promise<Note[]>;
  findById(id: string): Promise<Note | null>;
  update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note | null>;
  delete(ids: string[]): Promise<boolean>; // Requisito: eliminar varios IDs
}
