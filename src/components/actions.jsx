import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdDelete } from "react-icons/md"
import { blockUser, deleteUser, unBlockUser } from "@/api/users";
import { useRouter } from "next/navigation"; 

export default function Actions(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { usersId, setIsLoading } = props
    const router = useRouter()

    const onDelete = async () => {
        if (!usersId) {
            alert("No users selected")
            return
        }
        if (usersId == "all") {
            blockUser("all")
            return
        }
        const res = await deleteUser(Array.from(usersId))
        if (res.error) {
            if(res.status == 401){
                router.push("/login")
            }
            alert("An error happened")
        }
        setIsLoading(true)
    }
    const onBlock = async () => {
        if (!usersId) {
            alert("No users selected")
            return
        }
        if (usersId == "all") {
            blockUser("all")
            return
        }
        const res = await blockUser(Array.from(usersId))
        if (res.error) {
            if(res.status == 401){
                router.push("/login")
            }
            alert("An error happened")
        }
        alert(res)
        setIsLoading(true)
    }
    const onUnblock = async () => {
        if (!usersId) {
            alert("No users selected")
            return
        }
        if (usersId == "all") {
            blockUser("all")
            return
        }
        const res = await unBlockUser(Array.from(usersId))
        if (res.error) {
            if(res.status == 401){
                router.push("/login")
            }
            alert("An error happened")
        }
        alert(res)
        setIsLoading(true)
    }


    return (
        <div className="flex h-10 items-center gap-4 m-5">
            <button onClick={onBlock} className="flex items-center p-2 pr-4 h-9 bg-slate-500 rounded-md hover:bg-slate-700">
                <FaLock className="w-10" />
                Block
            </button>
            <button onClick={onUnblock} className="p-2 h-9 bg-slate-500 rounded-md hover:bg-slate-700">
                <FaLockOpen className="w-10" />
            </button>
            <Button onPress={onOpen} className="p-2 h-9 bg-red-500 rounded-md hover:bg-red-700">
                <MdDelete className="w-10" />
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="text-black bg-gray-300">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    U sure u want to delete this users?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => {
                                    onDelete()
                                    onClose()
                                }}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}