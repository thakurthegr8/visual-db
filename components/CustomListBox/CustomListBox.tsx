import React, { useContext, useEffect, Fragment } from "react";
import { Listbox } from "@headlessui/react";
import { dataTypes } from "../../default_objects/table_defaults";
import { DatabaseContext } from "../Playground/Playground";
import { TableContext } from "../TableEditor/TableEditor";
import { getUpdatedTables } from "../../runnables/tablesIterator";
import { tableSetterPair } from "../../types/Table";
interface Props {
  columnId: number;
  dataType: string;
}
export const CustomListBox: React.FC<Props> = ({ columnId, dataType }) => {
  const { database, updateDatabase } = useContext<tableSetterPair>(DatabaseContext);
  const id = useContext<number>(TableContext);
  const [selectedDataType, setSelectedDataType] = React.useState(dataType);
  useEffect(() => {
    updateDatabase(getUpdatedTables(database, id, columnId, selectedDataType, "dataType"));
  }, [selectedDataType]);
  return (
    <div className="max-w-[4rem]  relative inline">
      <Listbox value={selectedDataType} onChange={setSelectedDataType}>
        <Listbox.Button className="focus:ring-2 max-w-[4rem] dark:bg-black dark:bg-opacity-30 dark:text-white overflow-hidden focus:ring-offset-blue-600 p-1 rounded bg-white">
          {selectedDataType}
        </Listbox.Button>

        <Listbox.Options className="absolute flex flex-col z-10  left-14 border-black border float-right right-0 top-0 bg-slate-900 p-2 rounded transition space-y-2 shadow-md text-sm min-w-[16rem] h-40 outline-none ">
          <div className="overflow-y-scroll space-y-1 styled-scrollbar">
            {dataTypes.map((dataType, index) => (
              <Listbox.Option
                key={index}
                value={dataType}
                className={`hover:bg-slate-800 text-white cursor-pointer rounded px-2 py-1 font-medium mr-2 ${dataType === selectedDataType && "bg-slate-700"}`}
              >
                {dataType}
              </Listbox.Option>
            ))}
          </div>
        </Listbox.Options>
      </Listbox>
    </div>
  );
};
