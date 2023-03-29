import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Badge,
    HStack,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Card,
    Input,
    CardFooter,
    CardHeader,
    Collapse,
    CardBody
  } from '@chakra-ui/react';
  
// import react
import React from 'react';
//   import motion from framer
import { motion } from "framer-motion";
import ModalCard from './Modal';


  export default function SearchMainCard({heading_text, body_text, badge_text  }) {

    const [isExpanded, setIsExpanded] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false)

    let defaultState = {
        y:-20,
        scale:1,
    }
    let transformedState = {
        scale: [1, 2],
        borderRadius: ["0%", "10%"]
    }

    const handleToggle = () => setIsExpanded(!isExpanded)

    const handleClick = (e) => {
        e.preventDefault();
        setIsExpanded(!isExpanded);
        setModalVisible(!modalVisible)
    }
    return (
        <>
            <Card size={'lg'} as={motion.div} transition='0.1s linear' animate={{y:-20}}>
                <CardHeader paddingBottom={0}>
                    <HStack> 
                        <Heading size='md'>Client Report</Heading> <Badge  fontSize={'0.8em'} variant={'subtle'} colorScheme='pink'>Notion</Badge></HStack>
         
                </CardHeader>
            <CardBody margin={0}>
                <Stack margin={0}>
                <Text align={'left'}>
                    <Collapse startingHeight={20} in={isExpanded}>
                    View a summary of all your customers over the last month. How are you doing now, are you doing okay
                    WEll we thoughyou are going on a trip dear sire ut also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Collapse>
                </Text>
                </Stack>
            </CardBody>
            <CardFooter paddingTop={0}>
                <HStack>
                    <HStack>
                    <Button colorScheme='purple' size={'sm'} variant='outline'> Chat with Doc </Button>
                    <Button size={'sm'} onClick={handleToggle} colorScheme='purple' variant='ghost'> Show {isExpanded ? 'Less' : 'More'} </Button>
                    </HStack>
                    {/* <HStack>
                        <Button size={'sm'}  colorScheme='purple' variant='ghost' onClick={handleClick}> Expand </Button>
                    </HStack> */}
                </HStack>
            </CardFooter>
            </Card>
   
        </>
    );
  }