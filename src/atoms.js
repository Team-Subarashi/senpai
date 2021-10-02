import { atom, selector } from "recoil";


export const category = atom({
  key: "category",
  default: "Zumba",
});

export const loadedHTML = atom({
  key: "loadedHTML",
  default: "default HTML",
});

export const loadedCSS = atom({
  key: "loadedCSS",
  default: 'default CSS',
});
export const loadedJS = atom({
  key: "loadedJS",
  default: 'default JS',
});
export const loadedFiles = atom({
  key: "loadedFiles",
  default: 'default',
});


