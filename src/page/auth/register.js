import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
  Flex,
  Box,
  Stack,
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Spinner,
  Link,
  Text,
} from "@chakra-ui/react"
import { useDispatch } from "react-redux"

import useAPIHook from "hooks/useApiHook"
import validator from "utilities/validate"
import history from "utilities/history"
import toastAction from "state/actions/toastActions"

const Register = (props) => {
  const dispatch = useDispatch()

  const [form, setForm] = React.useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [formError, setFormError] = React.useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const registerAPI = useAPIHook({
    path: "/auth/register",
    method: "POST",
  })

  React.useEffect(() => {
    if (registerAPI.response && registerAPI.response.data) {
      const { token, user } = registerAPI.response.data
      localStorage.setItem("token", token)
      localStorage.setItem("email", user.email)
      localStorage.setItem("name", user.name)
      history.push("/user")
    }
  }, registerAPI.response)

  React.useEffect(() => {
    if (registerAPI.error !== null) {
      let errorMessage = ""

      const { email, password } = registerAPI.error
      if (email) {
        errorMessage = registerAPI.error["email"]
      }
      if (password) {
        errorMessage = registerAPI.error["password"]
      }
      dispatch(
        toastAction.showToast({
          title: "Error",
          description: errorMessage,
          status: "warning",
        })
      )
    }
  }, [registerAPI.error])

  const onChangeForm = (e) => {
    e.preventDefault()
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }))
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    if (validateForm(form)) {
      if (form.password !== form.confirmPassword) {
        setFormError((prevState) => ({
          ...prevState,
          password: "Passwords do not match.",
          confirmPassword: "Passwords do not match.",
        }))
      } else {
        registerAPI.executeHook(form)
      }
    }
  }

  const validateForm = (form) => {
    const data = validator.validateRegistrationForm(form)
    console.log(data)
    if (!data.status) {
      console.log("Error", data.error)
      setFormError(data.error)
    }
    return data.status
  }

  return (
    <Flex
      width="100%"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.700"
      padding={10}
    >
      <Box bg="white" width="lg" padding={5} boxShadow="lg" borderRadius="md">
        <Stack>
          <Heading size="lg">Register to continue</Heading>
          <form onSubmit={onSubmitForm}>
            <FormControl marginTop={2}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                aria-describedby="firstName-helper-text"
                isInvalid={formError.firstName}
                value={form.firstName}
                onChange={onChangeForm}
                isRequired
              />
              {formError.firstName && (
                <Text color="red.700" size="xs">
                  {formError.firstName}
                </Text>
              )}
            </FormControl>
            <FormControl marginTop={2}>
              <FormLabel htmlFor="middleName">Middle Name</FormLabel>
              <Input
                type="text"
                id="middleName"
                name="middleName"
                aria-describedby="middleName-helper-text"
                isInvalid={formError.middleName}
                value={form.middleName}
                onChange={onChangeForm}
                isRequired
              />
              {formError.middleName && (
                <Text color="red.700" size="xs">
                  {formError.middleName}
                </Text>
              )}
            </FormControl>
            <FormControl marginTop={2}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                aria-describedby="lastName-helper-text"
                isInvalid={formError.lastName}
                value={form.lastName}
                onChange={onChangeForm}
                isRequired
              />
              {formError.lastName && (
                <Text color="red.700" size="xs">
                  {formError.lastName}
                </Text>
              )}
            </FormControl>
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
            <FormControl marginTop={2}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                isInvalid={formError.confirmPassword}
                onChange={onChangeForm}
                isRequired
              />
              {formError.confirmPassword && (
                <Text color="red.700" size="xs">
                  {formError.confirmPassword}
                </Text>
              )}
            </FormControl>
            <Text>
              Have an account?{" "}
              <Link
                fontWeight="bold"
                color="green.600"
                as={RouterLink}
                to="/login"
              >
                Login
              </Link>
            </Text>
            <Button
              variant="solid"
              backgroundColor="gray.700"
              _hover={{ backgroundColor: "gray.800" }}
              marginTop={3}
              type="submit"
              color="white"
              disabled={registerAPI.loading}
            >
              Submit
            </Button>
          </form>
        </Stack>
      </Box>
    </Flex>
  )
}

export default Register
