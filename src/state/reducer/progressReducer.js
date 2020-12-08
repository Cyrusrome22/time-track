import ProgressTypes from "../types/progressType"

const initState = {
  upload: 0,
  download: 0,
  total: 0,
}

const progressReducer = (state = initState, action) => {
  let total = 0
  switch (action.type) {
    case ProgressTypes.PROGRESS_UPLOAD:
      total = (action.payload + state.download) / 2
      return { ...state, upload: action.payload, total }
    case ProgressTypes.PROGRESS_DOWNLOAD:
      total = (state.upload + action.payload) / 2
      return { ...state, download: action.payload, total }
    case ProgressTypes.CLEAR_PROGRESS:
      return { ...initState }
    default:
      return state
  }
}

export default progressReducer
