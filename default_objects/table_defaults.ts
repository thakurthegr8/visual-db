import { columnSchema, tableSchema } from "../types/Table";
import { Key } from "../elements/Icons/Icons";
import React from "react";

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
export const keyTypes: { type: string; icon: React.FC }[] = [
  { type: "primary key", icon: Key },
  { type: "unique key", icon: Key },
  { type: "none", icon: Key },
];
export const newTable: (id: number) => tableSchema = (id) => {
  return {
    id: id,
    name: `table_${id}`,
    columns: [],
    color: "blue",
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
