import { columnSchema, tableSchema } from "../types/Table";
import { newColumn } from "../default_objects/table_defaults";

export const addColumn = (
  database: tableSchema[],
  updateDatabase: (tables: tableSchema[]) => void,
  columns: columnSchema[],
  tableId: number
) => {
  const column = newColumn(
    columns.length == 0 ? columns.length : columns[columns.length - 1].id + 1
  );
  const newColumns = columns;
  newColumns.push(column);
  const newTables = database.map((table) => {
    if (table.id === tableId) {
      return {
        ...table,
        columns: newColumns,
      };
    }
    return table;
  });
  updateDatabase(newTables);
};

export const updateTableName = (
  name: string,
  database: tableSchema[],
  updateDatabase: (tables: tableSchema[]) => void,
  tableId: number
) => {
  const newTables = database.map((table) => {
    if (table.id === tableId) {
      return {
        ...table,
        name: name,
      };
    }
    return table;
  });
  updateDatabase(newTables);
};

export const updateColor = (
  colorName: string,
  database: tableSchema[],
  updateDatabase: (tables: tableSchema[]) => void,
  tableId: number
) => {
  const newTables = database.map((table) => {
    if (table.id === tableId) {
      return {
        ...table,
        color: colorName,
      };
    }
    return table;
  });
  updateDatabase(newTables);
};

export const deleteTable = (
  tableId: number,
  database: tableSchema[],
  updateDatabase: (tables: tableSchema[]) => void
) => {
  const newTables = database.filter((table) => table.id !== tableId);
  updateDatabase(newTables);
};
