import React from "react"
import { Flex, SimpleGrid, Box, Heading, Button, Text } from "@chakra-ui/react"
import dayjs from "dayjs"
import Navbar from "components/navbar/navbar"
import CheckinModal from "components/checkInModal/checkInModal"
import FilterModal from "components/filterModal/filterModal"
import TrackerTable from "components/trackerTable/trackerTable"
import useAPIHook from "hooks/useApiHook"
import UserService from "service/user"
import TrackerVisual from "components/trackerVisual/trackerVisual"
import DeleteModal from "components/deleteModal/deleteModal"
import { useDispatch } from "react-redux"
import filterActions from "state/actions/filterActions"

const User = (prop) => {
  const dispatch = useDispatch()
  const [openCheckin, setOpenCheckin] = React.useState(false)
  const [openFilter, setOpenFilter] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)
  const [checkinDelete, setCheckinDelete] = React.useState({})
  const [filter, setFilter] = React.useState(null)

  React.useEffect(() => {
    const getStartTodayDate = dayjs().hour(0).minute(0).second(0).millisecond(0)
    const getEndTodayDate = dayjs()
      .hour(23)
      .minute(59)
      .second(59)
      .millisecond(999)
    dispatch(
      filterActions.setFilter({
        start: getStartTodayDate.format(),
        end: getEndTodayDate.format(),
      })
    )
  }, [])

  return (
    <Flex
      width="100%"
      minHeight="100vh"
      backgroundColor="gray.700"
      justifyContent="center"
      alignItems="center"
      padding={10}
    >
      <Navbar />
      <CheckinModal open={openCheckin} setOpen={() => setOpenCheckin(false)} />
      <DeleteModal
        checkin={checkinDelete}
        open={openDelete}
        setOpen={() => setOpenDelete(false)}
      />
      <FilterModal
        open={openFilter}
        setOpen={() => setOpenFilter(false)}
        setFilter={setFilter}
      />
      <SimpleGrid columns={2} spacing={10} padding={10}>
        <Box
          padding={2}
          bg="gray.100"
          width="lg"
          display="flex"
          flexDirection="column"
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Heading size="md">Tracker</Heading>
            <div>
              <Button
                backgroundColor="gray.700"
                color="gray.100"
                marginRight={1}
                size="sm"
                _hover={{ backgroundColor: "gray.700" }}
                onClick={() => setOpenFilter(true)}
              >
                Filter
              </Button>
              <Button
                backgroundColor="green.700"
                color="gray.100"
                size="sm"
                _hover={{ backgroundColor: "green.700" }}
                onClick={() => setOpenCheckin(true)}
              >
                Add Check in
              </Button>
            </div>
          </Flex>
          <Box
            padding={2}
            bg="gray.100"
            display="flex"
            flexDirection="column"
            maxHeight={500}
            overflowY="scroll"
            overflowX="hidden"
          >
            <TrackerTable
              filter={filter}
              setOpenDelete={setOpenDelete}
              fetchCheckin={setCheckinDelete}
            />
          </Box>
        </Box>
        <Box
          padding={2}
          bg="gray.100"
          width="lg"
          display="flex"
          flexDirection="column"
          maxHeight={500}
          overflowY="scroll"
        >
          <Heading size="md">Visualization</Heading>
          <Flex
            height="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <TrackerVisual />
          </Flex>
        </Box>
      </SimpleGrid>
    </Flex>
  )
}

export default User
