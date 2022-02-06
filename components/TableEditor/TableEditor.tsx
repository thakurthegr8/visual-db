import React, { memo, useState, useContext, createContext } from "react";
import { newColumn } from "../../default_objects/table_defaults";
import { Actions, ColorSwatch, Pencil } from "../../elements/Icons/Icons";
import { tableSchema, tableSetterPair } from "../../types/Table";
import Column from "../Column/Column";
import { DatabaseContext } from "../Playground/Playground";

interface Props {
  data: tableSchema;
}

export const TableContext = createContext<number>(-1);
const TableEditor: React.FC<Props> = ({ data }) => {
  const { database, updateDatabase } = useContext<tableSetterPair>(DatabaseContext);
  const { name = "none", columns, color, id } = data;
  const addColumn = () => {
    const column = newColumn(columns.length);
    const newColumns = columns;
    newColumns.push(column);
    const newTables = database.map(table => {
      if (table.id === id) {
        return {
          ...table,
          columns: newColumns
        }
      }
      return table;
    });
    updateDatabase(newTables);
    console.log(database);
  }
  return (
    <div className="column-layout divide-y border-y">
      <div className="flex justify-between items-center bg-blue-100 border-blue-500 border-l-4 px-2 py-2 text-transparent hover:text-gray-600">
        <span className="font-medium text-blue-800">{name}</span>
        <div className="space-x-2">
          <button className="btn shadow-none hover:bg-blue-200 hover:text-blue-600 active:bg-blue-300 text-inherit" role="edit table">
            <Pencil />
          </button>
          <button className="btn shadow-none hover:bg-blue-200 hover:text-blue-600 active:bg-blue-300 text-inherit" role="actions">
            <Actions />
          </button>
        </div>
      </div>
      <TableContext.Provider value={id}>
      <div className="column-layout divide-y  transition-all text-xs">
        {
          columns.map((item, key) => <Column key={key} item={item} />)
        }
      </div>
      </TableContext.Provider>
      <div className="flex justify-between items-center px-2 py-2">
        <button className="btn shadow-none hover:bg-gray-200 text-gray-600"><ColorSwatch /></button>
        <button onClick={addColumn} className="btn border border-black shadow-none active:transform-none active:bg-black active:text-white hover:bg-gray-200  ">Add Column</button>
      </div>
    </div>
  );
};
export default memo(TableEditor);
