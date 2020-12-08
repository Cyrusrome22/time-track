import FilterTypes from "../types/filterType"

const setFilter = (payload) => {
  return {
    type: FilterTypes.SET_FILTER,
    payload,
  }
}

const refreshFilter = () => {
  return {
    type: FilterTypes.REFRESH_FILTER,
  }
}

export default {
  setFilter,
  refreshFilter,
}
