import dayjs from "dayjs"
import FilterTypes from "../types/filterType"

const getStartTodayDate = dayjs().hour(0).minute(0).second(0).millisecond(0)
const getEndTodayDate = dayjs().hour(23).minute(59).second(59).millisecond(999)

const initState = {
  filter: {
    start: getStartTodayDate.format(),
    end: getEndTodayDate.format(),
  },
}

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case FilterTypes.SET_FILTER:
      return { filter: action.payload }
    case FilterTypes.REFRESH_FILTER:
      return { filter: { ...state.filter } }
    default:
      return state
  }
}

export default filterReducer
