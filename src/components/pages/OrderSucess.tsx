import React from 'react'
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from '@heroui/react'
import { BadgeCheck } from 'lucide-react'

interface Props {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  handleCloseModal: () => void
}

const OrderSucess: React.FC<Props> = ({ openModal, setOpenModal, handleCloseModal }) => {
  return (
    <>
      <Modal isOpen={openModal} onOpenChange={setOpenModal} hideCloseButton={true} isDismissable={false}>
        <ModalContent className="font-qs">
          <>
            <ModalBody>
              <>
                <BadgeCheck size={50} color="#00d15b" className="mx-auto mt-6" />
                <h2 className="font-bold text-center mt-4">ĐẶT HÀNG THÀNH CÔNG</h2>
                <p className="my-4">
                  Đơn hàng của bạn đã được đặt thành công. Nhấn vào nút bên dưới nếu bạn muốn xem lại chi tiết đơn hàng
                  hoặc quay trở lại trang chủ.
                </p>
              </>
            </ModalBody>
            <ModalFooter>
              <Button className="text-white bg-[#01ad4b] w-full" color="primary" onPress={handleCloseModal}>
                CHI TIẾT ĐƠN HÀNG
              </Button>
              <Button className="bg-gray-100 w-full" color="primary" variant="flat" onPress={handleCloseModal}>
                QUAY LẠI TRANG CHỦ
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OrderSucess
