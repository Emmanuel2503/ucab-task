import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  INoteRepository,
  FindAllParams,
} from '../interfaces/note-repository.interface';
import { NoteDocument } from '../schemas/note.schema';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Note } from '../entities/note.entity';

@Injectable()
export class MongoNoteRepository implements INoteRepository {
  constructor(
    @InjectModel(NoteDocument.name) private noteModel: Model<NoteDocument>,
  ) {}

  // CORRECCIÓN AQUÍ:
  // 1. Aceptamos (doc: NoteDocument | null) porque findById puede no encontrar nada.
  // 2. Devolvemos (Note | null) porque si no hay doc, devolvemos null.
  private mapToEntity(doc: NoteDocument | null): Note | null {
    if (!doc) return null;

    return {
      id: doc._id.toString(),
      title: doc.title,
      content: doc.content,
      // Usamos notación de corchetes o 'as any' porque TS a veces no ve los timestamps automáticos
      createdAt: doc['createdAt'],
      updatedAt: doc['updatedAt'],
    };
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    const doc = await createdNote.save();
    return this.mapToEntity(doc) as Note; // Aquí sabemos que sí existe, forzamos Note
  }

  async findAll(params?: FindAllParams): Promise<Note[]> {
    const query = this.noteModel.find();

    if (params?.sortBy) {
      query.sort({ [params.sortBy]: 1 });
    }

    const docs = await query.exec();
    // Filtramos los nulos por seguridad, aunque find() suele devolver array vacío
    return docs
      .map((doc) => this.mapToEntity(doc))
      .filter((note): note is Note => note !== null);
  }

  async findById(id: string): Promise<Note | null> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return null;

    const doc = await this.noteModel.findById(id).exec();
    return this.mapToEntity(doc);
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note | null> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return null;

    const doc = await this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true })
      .exec();
    return this.mapToEntity(doc);
  }

  async delete(ids: string[]): Promise<boolean> {
    const result = await this.noteModel
      .deleteMany({ _id: { $in: ids } })
      .exec();
    return result.deletedCount > 0;
  }
}
