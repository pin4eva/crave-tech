import { IUser } from "./user.interface";

export interface INote {
  id: string;
  title: string;
  author: IUser;
  items: INoteItem[];
  complected: boolean;
}

export interface INoteItem {
  id: string;
  title: string;
  complected: boolean;
  note: INote;
}
