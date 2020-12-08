import toastTypes from "../types/toastTypes"

const showToast = (payload) => {
  return {
    type: toastTypes.SHOW_TOAST,
    payload,
  }
}

const closeToast = () => {
  return {
    type: toastTypes.CLOSE_TOAST,
  }
}

export default {
  showToast,
  closeToast,
}
