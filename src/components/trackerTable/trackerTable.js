import React from "react"
import useAPIHook from "hooks/useApiHook"
import { useDispatch, useSelector } from "react-redux"
import dataActions from "state/actions/dataActions"
import toastAction from "state/actions/toastActions"
import { Button, Text } from "@chakra-ui/react"
import dayjs from "dayjs"

const TrackerTable = (props) => {
  const dispatch = useDispatch()
  const { filter = null, setOpenDelete, fetchCheckin } = props
  const [trackers, setTrackers] = React.useState([])
  const filterState = useSelector((state) => state.filterReducer)
  console.log(filterState)
  const trackerAPI = useAPIHook({
    method: "GET",
    path: "/user/tracker",
  })

  React.useEffect(() => {
    if (filterState.filter !== null) {
      console.log("I was called")
      trackerAPI.executeHook({}, filterState.filter)
    }
  }, [filterState.filter])

  React.useEffect(() => {
    if (trackerAPI.response && trackerAPI.response.data) {
      const { data = [] } = trackerAPI.response.data
      setTrackers(data)
      dispatch(dataActions.setData(data))
    }
  }, [trackerAPI.response])

  React.useEffect(() => {
    if (trackerAPI.error !== null) {
      dispatch(
        toastAction.showToast({
          title: "Failed to load checkins",
          status: "warning",
        })
      )
    }
  }, [trackerAPI.error])

  return (
    <React.Fragment>
      <Text>From: {dayjs(filterState.filter.start).format("MM/DD/YYYY")}</Text>
      <Text>To: {dayjs(filterState.filter.end).format("MM/DD/YYYY")}</Text>
      <table style={{ border: "1px solid " }}>
        <thead style={{ border: "1px solid " }}>
          <tr style={{ border: "1px solid " }}>
            <th style={{ border: "1px solid " }}>Checkin</th>
            <th style={{ border: "1px solid " }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ border: "1px solid " }}>
          {trackers.length > 0 &&
            trackers.map((checkin, index) => {
              return (
                <tr key={`trackers-${index}`}>
                  <td
                    style={{ textAlign: "center", border: "1px solid " }}
                  >{`${checkin.number} ${checkin.hourFormat} ${checkin.tag} ${checkin.activities}`}</td>
                  <td style={{ textAlign: "center", border: "1px solid " }}>
                    <Button
                      backgroundColor="red.700"
                      size="xs"
                      color="white"
                      _hover={{ backgroundColor: "red.700" }}
                      onClick={() => {
                        setOpenDelete(true)
                        fetchCheckin(checkin)
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default TrackerTable
