import ProgressTypes from "../types/progressType"

const onUpload = (payload) => {
  return {
    type: ProgressTypes.PROGRESS_UPLOAD,
    payload,
  }
}

const onDownload = (payload) => {
  return {
    type: ProgressTypes.PROGRESS_DOWNLOAD,
    payload,
  }
}

const clearProgress = (payload) => {
  return {
    type: ProgressTypes.CLEAR_PROGRESS,
  }
}

export default {
  onUpload,
  onDownload,
  clearProgress,
}
