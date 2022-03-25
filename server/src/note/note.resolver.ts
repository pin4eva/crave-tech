import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NoteInput, NoteListInput } from 'src/graphql';
import { CurrentUser, GQLGuard } from 'src/strategies/jwt.guard';
import { UserDocument } from 'src/user/schema/user.schema';
import { NoteService } from './note.service';

@Resolver('Note')
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(GQLGuard)
  @Mutation()
  createNote(
    @Args('input') input: NoteInput,
    @CurrentUser() user: UserDocument,
  ) {
    return this.noteService.createNote({ ...input, author: user.id });
  }
  @Mutation()
  createNoteList(@Args('input') input: NoteListInput) {
    return this.noteService.createNoteList(input);
  }
  @Mutation()
  updateNote(@Args('input') input: NoteInput) {
    return this.noteService.updateNote(input);
  }
  @Mutation()
  updateNoteList(@Args('input') input: NoteListInput) {
    return this.noteService.updateNoteList(input);
  }
  @UseGuards(GQLGuard)
  @Mutation()
  deleteNote(@Args('id') id: string) {
    return this.noteService.deleteNote(id);
  }
  @Mutation()
  deleteNoteList(@Args('id') id: string) {
    return this.noteService.deletNoteList(id);
  }
  @Query()
  getNote(@Args('id') id: string) {
    return this.noteService.getNote(id);
  }
  @UseGuards(GQLGuard)
  @Query()
  getNotes(@CurrentUser() user: UserDocument) {
    return this.noteService.getNotes(user.id);
  }
  @Mutation()
  markComplected(@Args('id') id: string) {
    return this.noteService.markComplected(id);
  }
  @Query()
  getNoteLists() {
    return this.noteService.getNoteLists();
  }
}
