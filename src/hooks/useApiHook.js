import React from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import customAxios from "utilities/axios"
import progressAction from "state/actions/progressActions"
const CancelToken = axios.CancelToken

// This Hook is use for API Call to server.
// To use this hook, pass an object which has a method and path properties.
const useAPIHook = (props) => {
  const { path, method, contentType = "" } = props
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState(null)
  const [params, setParams] = React.useState(null)
  const [response, setResponse] = React.useState(null)
  const [error, setError] = React.useState(null)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(progressAction.onUpload(0))
    dispatch(progressAction.onDownload(0))
    let isNew = true
    const cancelToken = CancelToken.source()
    setError(null)
    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await customAxios(path, {
          method: method,
          ...(Object.keys(data).length > 0 ? { data } : {}),
          ...(Object.keys(params).length > 0 ? { params } : {}),
          ...(contentType ? { headers: { "Content-Type": contentType } } : {}),
          onUploadProgress: onUploadProgress,
          onDownloadProgress: onDownloadProgress,
          cancelToken: cancelToken.token,
        })
        if (!isNew) return
        setResponse({ ...res })
      } catch (err) {
        if (!isNew) return
        if (err.response && err.response.data) {
          if ("non_field_errors" in err.response.data) {
            const error = err.response.data["non_field_errors"].reduce(
              (acc, curr) => acc + ", " + curr
            )
            setLoading(false)
            return setError(error)
          }
        }
        setError(err.response ? err.response.data : null)
      }
      setLoading(false)
      dispatch(progressAction.clearProgress())
    }
    if (data !== null || params !== null) {
      fetchData()
    }
    return () => {
      isNew = false
      cancelToken.cancel()
    }
  }, [data, params])

  const onUploadProgress = (progressEvent) => {
    const progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    )
    dispatch(progressAction.onUpload(progress))
  }

  const onDownloadProgress = (progressEvent) => {
    const progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    )
    dispatch(progressAction.onDownload(progress))
  }

  const executeHook = (data = {}, params = {}) => {
    setData({ ...data })
    setParams({ ...params })
  }

  return { response, error, loading, executeHook }
}

export default useAPIHook
