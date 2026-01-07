import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Importar esto
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    // Cadena de conexión local a MongoDB
    MongooseModule.forRoot('mongodb://localhost:27017/ucab-tasks'),
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
