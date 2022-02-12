import { Disclosure, Menu, Transition } from "@headlessui/react";
import React, { memo, useState, useContext, createContext } from "react";
import { colors, newColumn } from "../../default_objects/table_defaults";
import { Actions, Chevron, ColorSwatch, Pencil, Trash } from "../../elements/Icons/Icons";
import { tableSchema, tableSetterPair } from "../../types/Table";
import Column from "../Column/Column";
import DropDown from "../DropDown/DropDown";
import { DatabaseContext } from "../Playground/Playground";

interface Props {
  data: tableSchema;
}

export const TableContext = createContext<number>(-1);
const TableEditor: React.FC<Props> = ({ data }) => {
  const { database, updateDatabase } = useContext<tableSetterPair>(DatabaseContext);
  const { name = "none", columns, color, id } = data;
  const [isEditMode, setEditMode] = useState(false);
  const [updatedName, updateName] = useState(name);
  const addColumn = () => {
    const column = newColumn(columns.length == 0 ? columns.length : columns[columns.length - 1].id + 1);
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
  const updateTableName = (name: string) => {
    const newTables = database.map(table => {
      if (table.id === id) {
        return {
          ...table,
          name: name
        }
      }
      return table;
    });
    updateDatabase(newTables);
  }
  const updateColor = (colorName: string) => {
    const newTables = database.map(table => {
      if (table.id === id) {
        return {
          ...table,
          color: colorName
        }
      }
      return table;
    });
    updateDatabase(newTables);
  }
  const colorGenerator = (colorName: string) => {
    return {
      backgroundColor: colorName,
      borderColor: colorName
    }
  }
  const deleteTable = () => {
    const newTables = database.filter(table => table.id !== id);
    updateDatabase(newTables);
    console.log(database.length);
  }
  return (
    <Disclosure>
      {({ open }) => (<>
        <div style={colorGenerator(color)} className="flex justify-between items-center bg-opacity-50 px-2 py-2 text-transparent hover:text-white" >
          {
            isEditMode ? <input type="text" onKeyPress={(e) => {
              if (e.key == "Enter") {
                setEditMode(false);
              }
              if (updatedName.length > 0) {
                updateTableName(updatedName);
              }
            }} onChange={e => updateName(e.target.value)} value={updatedName} placeholder="Enter table name..." className=" p-1 text-slate-900 rounded outline-none focus:ring-2 focus:ring-offset-blue-600" />
              : <Disclosure.Button><div className="font-medium text-white flex items-center justify-center space-x-2"><span className={`${open ? "rotate-180" : "rotate-0"} transition-all`}><Chevron /></span><span >{name}</span></div></Disclosure.Button>
          }
          <div className="space-x-2">
            <button onClick={() => setEditMode(!isEditMode)} className="btn shadow-none hover:bg-black hover:bg-opacity-10 active:bg-opacity-25 text-inherit" role="edit table">
              <Pencil />
            </button>
            <button onClick={() => deleteTable()} className="btn shadow-none hover:bg-black hover:bg-opacity-10 active:bg-opacity-25 text-inherit" role="actions">
              <Trash />
            </button>
          </div>
        </div>
        <Transition enter="transition duration-100 ease-out"
          enterFrom="transform scale-y-95 opacity-0"
          enterTo="transform scale-y-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-y-100 opacity-100"
          leaveTo="transform scale-y-95 opacity-0">
          <Disclosure.Panel>
            <TableContext.Provider value={id}>
              <div className="column-layout divide-y dark:divide-black  transition-all text-xs">
                {
                  columns.map((item, key) => <Column key={key} item={item} />)
                }
              </div>
            </TableContext.Provider>
            <div className="flex justify-between items-center px-2 py-2">
              <DropDown title="Table Colors" mainIcon={ColorSwatch}>
                <div className="grid grid-cols-4 gap-2">{colors.map((item, index) => <Menu.Item onClick={() => updateColor(item)} as="button" className="aspect-square p-2 rounded-2xl" style={colorGenerator(item)} key={index}></Menu.Item>)}</div>
              </DropDown>
              <button onClick={addColumn} className="btn border bg-fuchsia-500 text-white border-fuchsia-900 rounded-full shadow-none active:transform-none active:bg-fuchsia-900 active:text-white hover:bg-fuchsia-600">Add Column</button>
            </div>
          </Disclosure.Panel>
        </Transition></>)}
    </Disclosure>
  );
};
export default memo(TableEditor);
