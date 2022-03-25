import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Note,
  NoteList,
  NoteListSchema,
  NoteSchema,
} from './schemas/note.schema';

@Module({
  providers: [NoteResolver, NoteService],
  imports: [
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: NoteList.name, schema: NoteListSchema },
    ]),
  ],
})
export class NoteModule {}
