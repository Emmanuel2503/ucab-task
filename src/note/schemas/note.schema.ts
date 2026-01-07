import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Maneja automáticamente fechas de creación y modificación
export class NoteDocument extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const NoteSchema = SchemaFactory.createForClass(NoteDocument);
