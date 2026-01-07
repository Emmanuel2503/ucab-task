import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { NoteSchema, NoteDocument } from './schemas/note.schema';
import { MongoNoteRepository } from './repositories/mongo-note.repository';

@Module({
  imports: [
    // Registramos el esquema de Mongoose
    MongooseModule.forFeature([
      { name: NoteDocument.name, schema: NoteSchema },
    ]),
  ],
  controllers: [NoteController],
  providers: [
    NoteService,
    // Aquí ocurre la magia de la inyección de dependencias
    {
      provide: 'INoteRepository', // Usamos un token string para la interfaz
      useClass: MongoNoteRepository, // La clase que realmente se usará
    },
  ],
})
export class NoteModule {}
