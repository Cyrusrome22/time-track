import DataTypes from "../types/dataType"

const setData = (payload) => {
  return {
    type: DataTypes.SET_DATA,
    payload,
  }
}

const getData = () => {
  return {
    type: DataTypes.GET_DATA,
  }
}

export default {
  setData,
  getData,
}
