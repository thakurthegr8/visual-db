import { devUrl, isDev, productionUrl } from "../default_objects/default_strings";
import { tableSchema } from "../types/Table";

export const saveDatabase = (id: string, name: string, database: string) => {
    console.log(database);
    fetch(`${isDev ? devUrl:productionUrl}/api/update`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id: id, name: name, database: database }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  export const deleteDatabase = (id: string) => {
    fetch(`${isDev ? devUrl:productionUrl}/api/delete`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  export const addDatabase = (uid:string) => {
    fetch(`${isDev ? devUrl:productionUrl}/api/create`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ database: [],uid }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };