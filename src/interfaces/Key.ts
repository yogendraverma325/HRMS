export default interface ApiKeyInterface {
    id: number;
    key?: string | null;
    version: string;
    status?:boolean
    permissions?:string
  }