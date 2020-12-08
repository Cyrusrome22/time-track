const clearLocalStorage = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("name")
  localStorage.removeItem("email")
}

export default {
  clearLocalStorage: clearLocalStorage,
}
