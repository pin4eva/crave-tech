import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserDocument } from 'src/user/schema/user.schema';

export type NoteDocument = Note & Document;
export type NoteListDocument = NoteList & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'NoteList', autopopulate: true }],
  })
  items: NoteListDocument[];
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  })
  author: UserDocument;
}

@Schema()
export class NoteList {
  @Prop({
    type: Types.ObjectId,
    ref: 'Note',
    required: true,
    autopopulate: true,
  })
  note: NoteDocument;
  @Prop({ required: true })
  title: string;
  @Prop({ default: false })
  complected: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
export const NoteListSchema = SchemaFactory.createForClass(NoteList);
