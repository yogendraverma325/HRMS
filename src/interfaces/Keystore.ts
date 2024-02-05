import UserInterface from "./User.js";

export default interface KeystoreInterface {
    id?: number
    client: number;
    primaryKey: string | null;
    secondaryKey: string |null;
  }