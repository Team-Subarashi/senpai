import { atom, selector } from "recoil";


export const category = atom({
  key: "category",
  default: "Zumba",
});

export const loadedFiles = atom({
  key: "loadedFiles",
  default: 'default',
});

