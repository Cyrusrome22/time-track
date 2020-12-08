import React from "react"
import { Flex, Container, Box, Heading, Text, Button } from "@chakra-ui/react"
import useAPIHook from "hooks/useApiHook"
import common from "utilities/common"
import history from "utilities/history"
import userService from "service/user"

const Navbar = (props) => {
  const logoutAPI = useAPIHook({
    path: "/auth/logout",
    method: "POST",
  })

  React.useEffect(() => {
    const response = logoutAPI.response
    if (response !== null) {
      common.clearLocalStorage()
      history.push("/login")
    }
  }, [logoutAPI.response])

  const handleLogout = () => {
    logoutAPI.executeHook()
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding=".5rem"
      bg="white"
      color="gray.700"
      boxShadow="md"
      position="fixed"
      top="0"
      width="100%"
      {...props}
    >
      <Flex align="center">
        <Heading size="md">Time Tracker</Heading>
      </Flex>
      <Flex alignItems="center">
        <Text fontSize="sm" marginLeft={2}>
          {userService.getCurrentUser().name}
        </Text>
        <Button
          backgroundColor="gray.700"
          marginLeft={2}
          size="xs"
          color="white"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  )
}

export default Navbar
