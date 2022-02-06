import React, { memo, useState,useContext } from "react";
import { newColumn } from "../../default_objects/table_defaults";
import { Actions, ColorSwatch, Pencil } from "../../elements/Icons/Icons";
import {tableSchema, tableSetterPair } from "../../types/Table";
import Column from "../Column/Column";
import { TableContext } from "../Playground/Playground";

interface Props {
  data: tableSchema;
}

const TableEditor: React.FC<Props> = ({ data }) => {
  const {tables,addNewTables} = useContext<tableSetterPair>(TableContext);
  const { name = "none", columns, color, id } = data;
  const addColumn = () => {
    const column = newColumn(columns.length);
    const newColumns = columns;
    newColumns.push(column);
    const newTables = tables.map(table => {
      if (table.id === id) {
        return {
          ...table,
          columns: newColumns
        }
      }
      return table;
    });
    addNewTables(newTables);
    console.log(tables);
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
      <div className="column-layout divide-y  transition-all text-xs">
        {
          columns.map((item, key) => <Column key={key} item={item}/>)
        }
      </div>
      <div className="flex justify-between items-center px-2 py-2">
        <button className="btn shadow-none hover:bg-gray-200 text-gray-600"><ColorSwatch /></button>
        <button onClick={addColumn} className="btn border border-black shadow-none active:transform-none active:bg-black active:text-white hover:bg-gray-200  ">Add Column</button>
      </div>
    </div>
  );
};
export default memo(TableEditor);
