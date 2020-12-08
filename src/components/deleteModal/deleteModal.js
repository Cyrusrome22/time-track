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
import useAPIHook from "hooks/useApiHook"
import toastAction from "state/actions/toastActions"
import filterActions from "state/actions/filterActions"
import { useDispatch } from "react-redux"

const DeleteModal = (props) => {
  const dispatch = useDispatch()
  const { checkin = {}, open, setOpen } = props

  const deleteAPI = useAPIHook({
    method: "DELETE",
    path: `/user/tracker/${checkin.id}`,
  })
  const onDeleteCheckin = () => {
    deleteAPI.executeHook()
  }
  React.useEffect(() => {
    if (deleteAPI.response && deleteAPI.response.data) {
      dispatch(
        toastAction.showToast({
          title: "Checkin Deleted",
          description: "",
          status: "success",
        })
      )
      dispatch(filterActions.refreshFilter())
      setOpen()
    }
  }, [deleteAPI.response])

  React.useEffect(() => {
    if (deleteAPI.error !== null) {
      dispatch(
        toastAction.showToast({
          title: "Failed to delete checkin",
          status: "warning",
        })
      )
    }
  }, [deleteAPI.error])

  return (
    <Modal isOpen={open} onClose={setOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Check in</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" marginBottom={5}>
            <Text>Are you sure you want to delete this?</Text>
            <Text fontWeight="bold">{`${checkin.number} ${checkin.hourFormat} ${checkin.tag} ${checkin.activities}`}</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onDeleteCheckin}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal
