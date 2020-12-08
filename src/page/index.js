import React from "react"
import { Switch, Route } from "react-router-dom"
import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { useToast, Progress } from "@chakra-ui/react"
// Components Imports
import ProtectedRoute from "components/protectedRoute/protectedRoute"
import Login from "page/auth/login"
import history from "utilities/history"
import Register from "./auth/register"
import toastAction from "state/actions/toastActions"
import User from "./user"

const Validate = (props) => {
  const [loaded, setLoaded] = React.useState(false)
  const toastState = useSelector((state) => state.toastReducer)
  const progressState = useSelector((state) => state.progressReducer)
  const toast = useToast()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const token = localStorage.getItem("token") || ""
    const email = localStorage.getItem("email") || ""
    if (token === "undefined" || !token || !email) {
      setLoaded(true)
      return history.push("/login")
    }
    setLoaded(true)
    return history.push("/user")
  }, [])

  React.useEffect(() => {
    const { isOpen, title, description, status } = toastState
    if (isOpen) {
      toast({
        position: "top",
        title: title,
        description: description,
        status: status,
        duration: 2000,
      })
    }
    return () => {
      dispatch(toastAction.closeToast())
    }
  }, [toastState.isOpen])

  return (
    <React.Fragment>
      {progressState.total > 10 && progressState.total < 90 && (
        <Progress value={progressState.total} size="xs" />
      )}

      {loaded ? (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/user">
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          </Route>
        </Switch>
      ) : (
        <Flex
          width="100%"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
            label="Loading"
          />
        </Flex>
      )}
    </React.Fragment>
  )
}

export default Validate
