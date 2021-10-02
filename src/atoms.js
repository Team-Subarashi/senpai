import { atom } from "recoil";

export const category = atom({
  key: "category",
  default: "Zumba",
});

export const userState = atom({
    key: 'userState',
    default: {
        id: null,
        email: null,
    },
})

export const selectedSenpaiState = atom({
    key: 'selectedSenpaiState',
    default: null,
})

export const selectedDate = atom({
    key: 'selectedDate',
    default: new Date().setMinutes(0)
})