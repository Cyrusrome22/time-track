import DataTypes from "../types/dataType"

const initState = {
  data: [],
}

const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case DataTypes.SET_DATA:
      return { data: action.payload }
    case DataTypes.GET_DATA:
      return state
    default:
      return state
  }
}

export default dataReducer
