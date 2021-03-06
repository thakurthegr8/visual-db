import { tableSchema } from "../types/Table";
export const getUpdatedTables = (
  tables: tableSchema[],
  tableId: number,
  columnId: number,
  value: string = "any",
  type: string
) => {
  return tables.map((table) => {
    if (table.id === tableId) {
      const updatedColumns = table.columns.map((column) => {
        if (column.id === columnId) {
          if (type === "name") {
            return {
              ...column,
              name: value,
            };
          } else if (type === "dataType") {
            return {
              ...column,
              dataType: value,
            };
          } else if (type === "nullable") {
            return {
              ...column,
              nullable: !column.nullable,
            };
          }
          else if (type === "keyType") {
            return {
              ...column,
              keyType: value,
            };
          }
          else if (type === "autoIncrement") {
            return {
              ...column,
              autoIncrement: !column.autoIncrement,
            };
          }
          return {
            ...column,
            unsigned: !column.unsigned,
          };
        }
        
        return column;
      });
      return {
        ...table,
        columns: updatedColumns,
      };
    }
    return table;
  });
};
