import { tableSchema } from "../types/Table";
import { getUpdatedTables } from "./tablesIterator";

export const changeColumnName = (
  database: tableSchema[],
  updateDatabase: (tables: tableSchema[]) => void,
  tableId: number,
  columnId: number,
  columnName: string
) => {
  const updatedTables: tableSchema[] = getUpdatedTables(
    database,
    tableId,
    columnId,
    columnName,
    "name"
  );
  updateDatabase(updatedTables);
};

export const updateNullable = (
  database: tableSchema[],
  updateDatabase: (tables: tableSchema[]) => void,
  tableId: number,
  columnId: number
) => {
  const updatedTables: tableSchema[] = getUpdatedTables(
    database,
    tableId,
    columnId,
    "any",
    "nullable"
  );
  updateDatabase(updatedTables);
};

export const updateKey = (
  value: string,
  database: tableSchema[],
  updateDatabase: (tables: tableSchema[]) => void,
  tableId: number,
  columnId: number
) => {
  const updatedTables: tableSchema[] = getUpdatedTables(
    database,
    tableId,
    columnId,
    value,
    "keyType"
  );
  updateDatabase(updatedTables);
};

export const updateConstraints = (
  type: string,
  database: tableSchema[],
  updateDatabase: (tables: tableSchema[]) => void,
  tableId: number,
  columnId: number
) => {
  const updatedTables: tableSchema[] = getUpdatedTables(
    database,
    tableId,
    columnId,
    type,
    type
  );
  updateDatabase(updatedTables);
};

export const deleteColumn = (
  database: tableSchema[],
  updateDatabase: (tables: tableSchema[]) => void,
  tableId: number,
  columnId: number
) => {
  const updatedTables = database.map((table) => {
    if (table.id === tableId) {
      const columns = table.columns.filter((column) => column.id !== columnId);
      return {
        ...table,
        columns: columns,
      };
    }
    return table;
  });
  updateDatabase(updatedTables);
};
