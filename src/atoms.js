import { atom } from "recoil";


export const category = atom({
  key: "category",
  default: "D3",
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

export const userState = atom({
  key: 'userState',
  default: {
    id: null,
    email: null,
  },
})

export const lessonState = atom({
  key: 'lessonState',
  default: {},
})

export const selectedSenpaiState = atom({
  key: 'selectedSenpaiState',
  default: null,
})

export const selectedDate = atom({
  key: 'selectedDate',
  default: new Date().setMinutes(0)
})

export const roomAtom = atom({
  key: 'roomAtom',
  default: "default"
})


