import React from "react";
import { Listbox } from "@headlessui/react";
import { dataTypes } from "../../default_objects/table_defaults";
const people = [
  { id: 1, name: "int", unavailable: false },
  { id: 2, name: "bigint", unavailable: false },
  { id: 3, name: "binary", unavailable: false },
  { id: 4, name: "blob", unavailable: false },
  { id: 5, name: "boolean", unavailable: false },
];
export const CustomListBox = () => {
  const [selectedDataType, setSelectedDataType] = React.useState(dataTypes[0]);
  return (
    <div className="max-w-[4rem]  relative inline">
      <Listbox value={selectedDataType} onChange={setSelectedDataType}>
        <Listbox.Button className="focus:ring-2 focus:ring-offset-blue-600 p-1 rounded bg-white">
          {selectedDataType}
        </Listbox.Button>
        <Listbox.Options className="absolute flex flex-col z-10  left-14 border-black border float-right right-0 top-0 bg-white p-2 rounded transition space-y-2 shadow-md text-sm min-w-[10rem] h-40 outline-none ">
          <div className="overflow-y-scroll space-y-1 styled-scrollbar">
          {dataTypes.map((dataType, index) => (
            <Listbox.Option
              key={index}
              value={dataType}
              className="hover:bg-slate-300 cursor-pointer rounded px-2 py-1 font-medium mr-2"
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
