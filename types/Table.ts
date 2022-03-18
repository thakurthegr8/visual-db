export type columnSchema = {
  [key: string]: any;
  id: number;
  name: string;
  dataType: string;
  nullable: boolean;
  keyType: string;
  autoIncrement: boolean;
  unsigned: boolean;
};

export type tableSchema = {
  id: number;
  name: string;
  columns: columnSchema[];
  color: string;
};
export interface tableSetterPair {
  database: tableSchema[];
  updateDatabase: (tables: tableSchema[]) => void;
}
export interface databaseApiSchema {
  database: tableSchema[];
  name: string;
  id: string;
}
export interface ApiResponseMessage{
  message:string;
};
