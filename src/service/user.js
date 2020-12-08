class CurrentUser {
  getCurrentUser() {
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    return {
      name,
      email,
    }
  }
}

export default new CurrentUser()
