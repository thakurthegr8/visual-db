import { tableSchema, columnSchema } from "../types/Table";
import { newTable, newColumn } from "../default_objects/table_defaults";

export const addTable = (
  database: tableSchema[],
  setDatabase: (tables: tableSchema[]) => void
) => {
  const ntable: tableSchema = newTable(
    database.length == 0
      ? database.length
      : database[database.length - 1].id + 1
  );
  const nColumn: columnSchema = newColumn(0);
  ntable.columns.push(nColumn);
  setDatabase([...database, ntable]);
};

export const updateDatabase = (
  setDatabase: (tables: tableSchema[]) => void,ntables:tableSchema[]
) => {
    setDatabase(ntables);
};
