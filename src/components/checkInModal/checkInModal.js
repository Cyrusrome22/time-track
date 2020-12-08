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
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Text,
  Flex,
} from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import validator from "utilities/validate"

import useAPIHook from "hooks/useApiHook"
import useDebounce from "hooks/useDebounce"
import toastAction from "state/actions/toastActions"
import dayjs from "dayjs"
import filterActions from "state/actions/filterActions"

const CheckinModal = (props) => {
  const dispatch = useDispatch()
  const { open, setOpen } = props
  const [taglist, setTaglist] = React.useState([])
  const [form, setForm] = React.useState({
    checkin: "",
    date: "",
  })
  const [formError, setFormError] = React.useState({
    checkin: "",
    date: "",
  })

  const tag = useDebounce(form.checkin)

  const suggestAPI = useAPIHook({
    path: "/tag",
    method: "GET",
  })

  const saveCheckin = useAPIHook({
    path: "/user/tracker",
    method: "POST",
  })

  React.useEffect(() => {
    const currentDate = `${dayjs().year()}-${
      dayjs().month() + 1
    }-${dayjs().date()}`
    setForm((prevState) => ({
      ...prevState,
      date: currentDate,
    }))
  }, [])

  React.useEffect(() => {
    const pattern = /(\d+\.?\d*)\s(hrs|hr)\s(#\S+)/
    const groups = pattern.exec(tag)
    if (groups && groups.length >= 3) {
      const debounceTag = groups[3]
      suggestAPI.executeHook(
        {},
        {
          tag: debounceTag,
        }
      )
    } else {
      setTaglist([])
    }
  }, [tag])

  React.useEffect(() => {
    if (suggestAPI.response && suggestAPI.response.data) {
      const { data = [] } = suggestAPI.response.data
      setTaglist(data)
    }
  }, [suggestAPI.response])

  React.useEffect(() => {
    if (saveCheckin.response && saveCheckin.response.data) {
      setForm({
        checkin: "",
        date: "",
      })
      setFormError({
        checkin: "",
        date: "",
      })
      dispatch(
        toastAction.showToast({
          title: "Checkin Added",
          description: "",
          status: "success",
        })
      )
      dispatch(filterActions.refreshFilter())
      setOpen()
    }
  }, [saveCheckin.response])

  React.useEffect(() => {
    if (saveCheckin.error !== null) {
      dispatch(
        toastAction.showToast({
          title: "Failed to add checkin",
          status: "warning",
        })
      )
    }
  }, [saveCheckin.error])

  const onChangeForm = (e) => {
    e.preventDefault()
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    setFormError((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }))
  }

  const onClickAdd = (e) => {
    e.preventDefault()
    if (validateForm(form.checkin)) {
      const pattern = /(\d+\.?\d*)\s(hrs|hr)\s(#\S+)\s(.+)/
      const groups = pattern.exec(form.checkin)
      const data = {
        date: dayjs(new Date(form.date)).format(),
        number: groups[1],
        hourFormat: groups[2],
        tag: groups[3],
        activities: groups[4],
      }
      saveCheckin.executeHook(data)
    }
  }

  const onClickSuggestion = (tag) => {
    let temp = form.checkin
    const replacedCheckin = temp.replace(
      /(\d+\.?\d*\s)(hrs|hr)(\s)#\S+(\s.*)?/,
      `$1$2$3${tag}$4`
    )
    setForm((prevState) => ({
      ...prevState,
      checkin: replacedCheckin,
    }))
  }

  const validateForm = (checkin) => {
    const data = validator.validateCheckinForm({ checkin: form.checkin })
    if (!data.status) {
      setFormError((prevState) => ({
        ...prevState,
        checkin: "Please follow correct format.",
      }))
    }
    if (!form.date) {
      setFormError((prevState) => ({
        ...prevState,
        date: "Date must not be empty.",
      }))
    }
    return data.status
  }

  return (
    <Modal isOpen={open} onClose={setOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Check in</ModalHeader>
        <ModalBody>
          <form autoComplete="off">
            <FormControl id="checkin">
              <FormLabel>Check in</FormLabel>
              <Input
                type="text"
                name="checkin"
                value={form.checkin}
                isInvalid={formError.checkin}
                onChange={onChangeForm}
                isRequired
              />
              {taglist.length > 0 && (
                <Flex marginTop={2} flexWrap="wrap">
                  {taglist.map((tag, index) => {
                    return (
                      <Button
                        key={`tag-${index}`}
                        onClick={() => onClickSuggestion(tag.tag)}
                        marginRight={1}
                      >
                        {tag.tag}
                      </Button>
                    )
                  })}
                </Flex>
              )}
              {formError.checkin && (
                <Text color="red.700" size="xs">
                  {formError.checkin}
                </Text>
              )}
              <FormHelperText>
                Format: {"<number> [hr | hrs] #tag activities"}{" "}
              </FormHelperText>
              <FormHelperText>
                Example: {"2 hrs #learning docker"}{" "}
              </FormHelperText>
            </FormControl>
            <FormControl id="checkin" marginTop={2}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                size="sm"
                onChange={onChangeForm}
                isInvalid={formError.date}
                name="date"
                value={form.date}
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={setOpen}
            disabled={saveCheckin.loading}
          >
            Close
          </Button>
          <Button
            variant="ghost"
            backgroundColor="green.700"
            _hover={{ backgroundColor: "green.700" }}
            color="white"
            onClick={onClickAdd}
            disabled={saveCheckin.loading}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CheckinModal
