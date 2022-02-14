import { columnSchema, tableSchema } from "../types/Table";
import { Key } from "../elements/Icons/Icons";

export const dataTypes: string[] = [
  "bigint",
  "binary",
  "blob",
  "boolean",
  "char",
  "date",
  "datetime",
  "decimal",
  "double",
  "enum",
  "float",
  "geometry",
  "geometrycollection",
  "int",
  "json",
  "linestring",
  "longtext",
  "mediumint",
  "multilinestring",
  "multipoint",
  "multipolygon",
  "point",
  "polygon",
  "smallint",
  "text",
  "time",
  "timestamp",
  "tinyint",
  "uuid",
  "varchar",
  "year",
];

export const colors = [
  "#5800FF",
  "#E900FF",
  "#FFC600",
  "#FF1700",
  "#00EAD3",
  "#64DFDF",
  "#FF5200",
];
export const transitionDefaults = {
  enter: "transition duration-100 ease-out",
  enterFrom: "transform scale-95 opacity-0",
  enterTo: "transform scale-100 opacity-100",
  leave: "transition duration-75 ease-out",
  leaveFrom: "transform scale-100 opacity-100",
  leaveTo: "transform scale-95 opacity-0",
};
export const keyTypes: { type: string; Icon: any }[] = [
  { type: "primary key", Icon: Key },
  { type: "unique key", Icon: Key },
  { type: "none", Icon: Key },
];
export const constraintTypes: { type: string; name: string }[] = [
  { type: "autoIncrement", name: "auto increment" },
  { type: "unsigned", name: "unsigned" },
];
export const newTable: (id: number) => tableSchema = (id) => {
  return {
    id: id,
    name: `table_${id}`,
    columns: [],
    color: "#5800FF",
  };
};

export const newColumn: (id: number) => columnSchema = (id) => {
  return {
    id: id,
    name: `column_${id}`,
    dataType: "int",
    nullable: false,
    keyType: "none",
    autoIncrement: false,
    unsigned: false,
  };
};
export const verticalTransition = {
  enter: "transition duration-100 ease-out",
  enterFrom: "transform scale-y-95 opacity-0",
  enterTo: "transform scale-y-100 opacity-100",
  leave: "transition duration-75 ease-out",
  leaveFrom: "transform scale-y-100 opacity-100",
  leaveTo: "transform scale-y-95 opacity-0",
};
