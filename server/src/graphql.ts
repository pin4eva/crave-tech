
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface SignupInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    password?: Nullable<string>;
    email?: Nullable<string>;
}

export interface NoteInput {
    id?: Nullable<string>;
    title?: Nullable<string>;
    author?: Nullable<string>;
}

export interface NoteListInput {
    id?: Nullable<string>;
    title?: Nullable<string>;
    note?: Nullable<string>;
    complected?: Nullable<boolean>;
}

export interface UserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export interface LoginResponse {
    id?: Nullable<string>;
    token?: Nullable<string>;
    isActive?: Nullable<boolean>;
    user?: Nullable<User>;
}

export interface IQuery {
    me(): Nullable<User> | Promise<Nullable<User>>;
    verifyToken(token?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    verifyToChangePassword(id?: Nullable<string>, token?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    getNotes(): Nullable<Nullable<Note>[]> | Promise<Nullable<Nullable<Note>[]>>;
    getNote(id?: Nullable<string>): Nullable<Note> | Promise<Nullable<Note>>;
    getNoteLists(): Nullable<Nullable<NoteList>[]> | Promise<Nullable<Nullable<NoteList>[]>>;
    getNoteListByNote(): Nullable<Nullable<NoteList>[]> | Promise<Nullable<Nullable<NoteList>[]>>;
    getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    signup(input?: Nullable<SignupInput>): Nullable<User> | Promise<Nullable<User>>;
    login(email?: Nullable<string>, password?: Nullable<string>): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;
    createNote(input?: Nullable<NoteInput>): Nullable<Note> | Promise<Nullable<Note>>;
    updateNote(input?: Nullable<NoteInput>): Nullable<Note> | Promise<Nullable<Note>>;
    deleteNote(id?: Nullable<string>): Nullable<Note> | Promise<Nullable<Note>>;
    createNoteList(input?: Nullable<NoteListInput>): Nullable<NoteList> | Promise<Nullable<NoteList>>;
    updateNoteList(input?: Nullable<NoteListInput>): Nullable<NoteList> | Promise<Nullable<NoteList>>;
    deleteNoteList(id?: Nullable<string>): Nullable<NoteList> | Promise<Nullable<NoteList>>;
    markComplected(id?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateUser(input?: Nullable<SignupInput>): Nullable<User> | Promise<Nullable<User>>;
    deleteUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    validateUsername(username?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;
    validateEmail(email?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;
    uploadImage(image?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    changeRole(id?: Nullable<string>, role?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    changeAccountType(id?: Nullable<string>, accountType?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    deleteAllUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export interface Note {
    id?: Nullable<string>;
    title?: Nullable<string>;
    items?: Nullable<Nullable<NoteList>[]>;
    author?: Nullable<User>;
}

export interface NoteList {
    id?: Nullable<string>;
    title?: Nullable<string>;
    complected?: Nullable<boolean>;
    note?: Nullable<Note>;
}

export interface User {
    id?: Nullable<string>;
    name?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    google_id?: Nullable<string>;
    visibility?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    customers?: Nullable<Nullable<User>[]>;
    email?: Nullable<string>;
    emailToken?: Nullable<string>;
    role?: Nullable<string>;
    accountType?: Nullable<string>;
    connections?: Nullable<Nullable<User>[]>;
    lastSeen?: Nullable<Date>;
    image?: Nullable<string>;
    state?: Nullable<string>;
    lga?: Nullable<string>;
    phone?: Nullable<string>;
}

type Nullable<T> = T | null;
