import {
    Box,
    Heading,
    Container,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
   useDisclosure
  } from '@chakra-ui/react';
  
// import react
import React from 'react';

export default function ModalCard({title_text, body_text, badge_text, badge_color, modal_open}) {
    const { isOpen, onOpen, onClose } = useDisclosure(modal_open? (true) : (false))
    const [size, setSize] = React.useState('md')
  
    const handleSizeClick = (newSize) => {
      setSize(newSize)
      onOpen()
    }
    if (modal_open) {
        onOpen()
    }

    const handleOnClose = () => {
        onClose()
    }

  
    const sizes = ['xl']
  
    return (
      <>
        <Modal onClose={false} size={size} isOpen={true}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title_text}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {body_text}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }