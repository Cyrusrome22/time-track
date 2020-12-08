import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Divider,
  Input,
  Text,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import { useDispatch } from "react-redux"
import filterActions from "state/actions/filterActions"

const FilterModal = (props) => {
  const dispatch = useDispatch()
  const { open, setOpen, setFilter } = props
  const [date, setDate] = React.useState("")
  const [errorDate, setErrorDate] = React.useState("")

  React.useEffect(() => {
    return () => {
      setDate("")
      setErrorDate("")
    }
  }, [])

  const onClickToday = (e) => {
    e.preventDefault()
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
    setOpen()
  }

  const onClickWeekly = (e) => {
    e.preventDefault()
    const getStartWeeklyDate = dayjs()
      .day(0)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
    const getEndWeeklyDate = dayjs()
      .day(6)
      .hour(23)
      .minute(59)
      .second(59)
      .millisecond(999)

    dispatch(
      filterActions.setFilter({
        start: getStartWeeklyDate.format(),
        end: getEndWeeklyDate.format(),
      })
    )
    setOpen()
  }

  const onClickMonthly = (e) => {
    e.preventDefault()
    const getStartMonthlyDate = dayjs()
      .date(1)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
    let getEndMonthlyDate
    getEndMonthlyDate = dayjs()
      .date(31)
      .hour(23)
      .minute(59)
      .second(59)
      .millisecond(999)
    let endOfMonthCount = 31
    while (getStartMonthlyDate.month() !== getEndMonthlyDate.month()) {
      getEndMonthlyDate = dayjs()
        .date(endOfMonthCount - 1)
        .hour(23)
        .minute(59)
        .second(59)
        .millisecond(999)
    }

    dispatch(
      filterActions.setFilter({
        start: getStartMonthlyDate.format(),
        end: getEndMonthlyDate.format(),
      })
    )
    setOpen()
  }

  const onChangeDate = (e) => {
    e.preventDefault()
    setDate(e.target.value)
    setErrorDate("")
  }

  const onSetClickDate = (e) => {
    e.preventDefault()
    if (!date) {
      return setErrorDate("Input Valid Date.")
    }
    const getStartDate = dayjs(new Date(date))
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)

    const getEndDate = dayjs(new Date(date))
      .hour(23)
      .minute(59)
      .second(59)
      .millisecond(999)
    dispatch(
      filterActions.setFilter({
        start: getStartDate.format(),
        end: getEndDate.format(),
      })
    )
    setOpen()
  }

  return (
    <Modal isOpen={open} onClose={setOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent="space-between" marginBottom={5}>
            <Button
              size="sm"
              backgroundColor="green.700"
              color="white"
              _hover={{ backgroundColor: "green.700" }}
              onClick={onClickToday}
            >
              Today
            </Button>
            <Button
              size="sm"
              backgroundColor="green.700"
              color="white"
              _hover={{ backgroundColor: "green.700" }}
              onClick={onClickWeekly}
            >
              Weekly
            </Button>
            <Button
              size="sm"
              backgroundColor="green.700"
              color="white"
              _hover={{ backgroundColor: "green.700" }}
              onClick={onClickMonthly}
            >
              Monthly
            </Button>
          </Flex>
          <Divider marginBottom={10} />
          <Text size="sm">Filter by date</Text>
          <Flex justifyContent="space-between" marginBottom={5}>
            <Input
              type="date"
              size="sm"
              onChange={onChangeDate}
              isInvalid={errorDate}
              value={date}
            />
            <Button
              size="sm"
              backgroundColor="green.700"
              color="white"
              _hover={{ backgroundColor: "green.700" }}
              onClick={onSetClickDate}
            >
              Set
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={setOpen}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FilterModal
