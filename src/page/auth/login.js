import React from "react"
import { Link as RouterLink } from "react-router-dom"
import {
  Flex,
  Box,
  Stack,
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Link,
  Text,
} from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import useAPIHook from "hooks/useApiHook"
import validator from "utilities/validate"
import history from "utilities/history"
import toastAction from "state/actions/toastActions"

const Login = (props) => {
  const dispatch = useDispatch()

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  })

  const [formError, setFormError] = React.useState({
    email: "",
    password: "",
  })

  const loginAPI = useAPIHook({
    path: "/auth/login",
    method: "POST",
  })

  React.useEffect(() => {
    if (loginAPI.response && loginAPI.response.data) {
      const { token, user } = loginAPI.response.data
      localStorage.setItem("token", token)
      localStorage.setItem("email", user.email)
      localStorage.setItem("name", user.name)
      history.push("/user")
    }
  }, loginAPI.response)

  React.useEffect(() => {
    if (loginAPI.error !== null) {
      dispatch(
        toastAction.showToast({
          title: "Invalid Account",
          description: "Invalid Account",
          status: "warning",
        })
      )
    }
  }, [loginAPI.error])

  const onSubmitForm = (e) => {
    e.preventDefault()
    if (validateForm(form)) {
      loginAPI.executeHook(form)
    }
  }

  const onChangeForm = (e) => {
    e.preventDefault()
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }))
  }

  const validateForm = (form) => {
    const data = validator.validateLoginForm(form)
    if (!data.status) {
      setFormError(data.error)
    }
    return data.status
  }

  return (
    <Flex
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.700"
    >
      <Box bg="white" width="md" padding={5} boxShadow="lg" borderRadius="md">
        <Stack>
          <Heading size="lg">Login to continue</Heading>
          <form onSubmit={onSubmitForm}>
            <FormControl marginTop={2}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="text"
                id="email"
                name="email"
                aria-describedby="email-helper-text"
                isInvalid={formError.email}
                value={form.email}
                onChange={onChangeForm}
                isRequired
              />
              {formError.email && (
                <Text color="red.700" size="xs">
                  {formError.email}
                </Text>
              )}
            </FormControl>
            <FormControl marginTop={2}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                isRequired
                isInvalid={formError.password}
                value={form.password}
                onChange={onChangeForm}
              />
              {formError.password && (
                <Text color="red.700" size="xs">
                  {formError.password}
                </Text>
              )}
            </FormControl>
            <Text>
              New user?{" "}
              <Link
                fontWeight="bold"
                color="green.600"
                as={RouterLink}
                to="/register"
              >
                Register
              </Link>
            </Text>
            <Button
              variant="solid"
              backgroundColor="gray.700"
              _hover={{ backgroundColor: "gray.800" }}
              marginTop={3}
              type="submit"
              color="white"
            >
              Submit
            </Button>
          </form>
        </Stack>
      </Box>
    </Flex>
  )
}

export default Login
