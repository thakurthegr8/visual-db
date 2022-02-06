export type columnSchema = {
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
  updateDatabase: (tables: tableSchema[]) => void ;
}
