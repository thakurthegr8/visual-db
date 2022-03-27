import React, { memo, useState, useContext, createContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { colors, verticalTransition } from "../../default_objects/table_defaults";
import { Chevron, ColorSwatch, Pencil, Trash } from "../../elements/Icons/Icons";
import { tableSchema, tableSetterPair } from "../../types/Table";
import Column from "../Column/Column";
import DropDown from "../DropDown/DropDown";
import { DatabaseContext } from "../Playground/Playground";
import { addColumn, updateColor, updateTableName, deleteTable } from "../../runnables/table_runnables";
import { colorGenerator, colorGeneratorWithBg } from "../../generators/generators_color";
import tableEditorStyles from "./TableEditor.module.css";

interface Props {
  data: tableSchema;
}

export const TableContext = createContext<number>(-1);
const TableEditor: React.FC<Props> = ({ data }) => {
  const { database, updateDatabase } = useContext<tableSetterPair>(DatabaseContext);
  const { name = "none", columns, color, id } = data;
  const [isEditMode, setEditMode] = useState(false);
  const [updatedName, updateName] = useState(name);
  return (
    <Disclosure>
      {({ open }) => (<>
        <div style={colorGenerator(color)} className={tableEditorStyles.main} >
          {
            isEditMode ? <input type="text" onKeyPress={(e) => {
              if (e.key == "Enter") {
                setEditMode(false);
              }
              if (updatedName.length > 0) {
                updateTableName(updatedName, database, updateDatabase, id);
              }
            }} onChange={e => updateName(e.target.value)} value={updatedName} placeholder="Enter table name..." className={tableEditorStyles.tableNameEditor} />
              : <Disclosure.Button><div className={tableEditorStyles.tableNameDisclosureButton}><span className={`${open ? "rotate-180" : "rotate-0"} transition-all`}><Chevron /></span>
                <span className="text-inherit">{name}</span>
              </div>
              </Disclosure.Button>
          }
          <div className="space-x-2 text-inherit">
            <button onClick={() => setEditMode(!isEditMode)} className={`btn ${tableEditorStyles.setEditModeButton}`}>
              <Pencil />
            </button>
            <button onClick={() => deleteTable(id, database, updateDatabase)} className={`btn ${tableEditorStyles.deleteTableButton}`} role="actions">
              <Trash />
            </button>
          </div>
        </div>
        <Transition {...verticalTransition}>
          <Disclosure.Panel>
            <TableContext.Provider value={id}>
              <div className={`column-layout ${tableEditorStyles.columns}`}>
                {
                  columns.map((item, key) => <Column key={key} item={item} />)
                }
              </div>
            </TableContext.Provider>
            <div className={tableEditorStyles.tableActions}>
              <DropDown alignment="right" title="Table Colors" mainIcon={ColorSwatch}>
                <div className="grid grid-cols-4 gap-2">{colors.map((item, index) => <Menu.Item onClick={() => updateColor(item, database, updateDatabase, id)} as="button" className={tableEditorStyles.colorSelectorButton} style={colorGeneratorWithBg(item)} key={index}></Menu.Item>)}</div>
              </DropDown>
              <button onClick={() => addColumn(database, updateDatabase, columns, id)} className={`btn ${tableEditorStyles.addColumnButton}`}>Add Column</button>
            </div>
          </Disclosure.Panel>
        </Transition></>)}
    </Disclosure>
  );
};
export default memo(TableEditor);
