import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Note,
  NoteDocument,
  NoteList,
  NoteListDocument,
} from './schemas/note.schema';
import { Model } from 'mongoose';
import { NoteInput, NoteListInput } from 'src/graphql';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
    @InjectModel(NoteList.name)
    private readonly noteListModel: Model<NoteListDocument>,
  ) {}

  async createNote(input: NoteInput): Promise<NoteDocument> {
    if (!input.title) throw new BadRequestException('Title field is required');
    try {
      const note = await this.noteModel.create(input);
      return note;
    } catch (error) {
      throw error;
    }
  }
  async updateNote(input: NoteInput): Promise<NoteDocument> {
    try {
      const note = await this.noteModel.findByIdAndUpdate(input.id, input, {
        new: true,
      });
      return note;
    } catch (error) {
      throw error;
    }
  }
  async getNote(id: string): Promise<NoteDocument> {
    try {
      const note = await this.noteModel.findById(id);
      if (!note) throw new NotFoundException('No matching record found');
      return note;
    } catch (error) {
      throw error;
    }
  }
  async getNotes(author: string): Promise<NoteDocument[]> {
    try {
      const notes = await this.noteModel.find({ author });
      return notes;
    } catch (error) {
      throw error;
    }
  }
  async deleteNote(id: string): Promise<NoteDocument> {
    try {
      const note = await this.noteModel.findById(id);
      if (!note) throw new NotFoundException('No matching record found');
      await this.noteListModel.deleteMany({ note: note.id });
      note.remove();
      return note;
    } catch (error) {
      throw error;
    }
  }

  // NoteList
  async createNoteList(input: NoteListInput): Promise<NoteListDocument> {
    if (!input.title) throw new BadRequestException('Title field is required');
    try {
      const list = await this.noteListModel.create(input);
      await this.noteModel.findByIdAndUpdate(
        input.note,
        { $addToSet: { items: list.id } },
        { new: true },
      );
      return list;
    } catch (error) {
      throw error;
    }
  }
  async updateNoteList(input: NoteListInput): Promise<NoteListDocument> {
    try {
      const list = await this.noteListModel.findByIdAndUpdate(input.id, input, {
        new: true,
      });
      return list;
    } catch (error) {
      throw error;
    }
  }
  async deletNoteList(id: string): Promise<NoteListDocument> {
    try {
      const list = await this.noteListModel.findById(id);
      if (!list) throw new NotFoundException('No matching record');
      await this.noteModel.findByIdAndUpdate(list.note, {
        $pull: { items: list.id },
      });
      list.remove();
      return list;
    } catch (error) {
      throw error;
    }
  }
  async markComplected(id: string): Promise<boolean> {
    try {
      const list = await this.noteListModel.findByIdAndUpdate(
        id,
        [{ $set: { complected: { $eq: [false, '$complected'] } } }],
        { new: true },
      );
      return list.complected;
    } catch (error) {
      throw error;
    }
  }
  async getNoteLists(): Promise<NoteListDocument[]> {
    try {
      const list = await this.noteListModel.find();
      return list;
    } catch (error) {
      throw error;
    }
  }
}
