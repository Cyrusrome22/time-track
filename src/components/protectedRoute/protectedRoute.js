import React from "react"
import history from "utilities/history"

const ProtectedRoute = (props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  React.useEffect(() => {
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    if (!token || !email) return history.push("/")
    setIsAuthenticated(true)
  }, [])
  return <React.Fragment>{isAuthenticated && props.children}</React.Fragment>
}

export default ProtectedRoute
