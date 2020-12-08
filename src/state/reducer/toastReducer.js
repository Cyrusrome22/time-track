import toastTypes from "../types/toastTypes"

const initState = {
  isOpen: false,
  title: "",
  description: "",
  status: "success",
}

const toastsReducer = (state = initState, action) => {
  switch (action.type) {
    case toastTypes.SHOW_TOAST:
      return { ...state, ...action.payload, isOpen: true }
    case toastTypes.CLOSE_TOAST:
      return { ...state, ...action.payload, isOpen: false }
    default:
      return state
  }
}

export default toastsReducer
