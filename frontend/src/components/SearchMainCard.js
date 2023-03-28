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
    CardBody
  } from '@chakra-ui/react';
  
//   import motion from framer
import { motion } from "framer-motion";
  
  export default function SearchMainCard({heading_text, body_text, badge_text }) {
    return (
        <>
            <Card size={'lg'} as={motion.div}   transition='0.1s linear' animate={{y:-20}}>
                <CardHeader paddingBottom={0}>
                    <HStack justifyContent={'space-between'}> <Heading size='md'>Client Report</Heading> <Badge  fontSize={'0.8em'} variant={'outline'} colorScheme='green'>Notion</Badge></HStack>
         
                </CardHeader>
            <CardBody margin={0}>
                <Stack margin={0}>
                <Text align={'left'}>View a summary of all your customers over the last month. How are you doing now, are you doing okay
                    WEll we thoughyou are going on a trip dear sire ut also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
                </Stack>
            </CardBody>
            <CardFooter paddingTop={0}>
                <HStack>
                    <HStack>
                    <Button colorScheme='purple' size={'sm'}> Chat with Doc </Button>
                    <Button size={'sm'}  colorScheme='purple' variant='ghost'> Preview Document </Button>
                    </HStack>
                </HStack>
            </CardFooter>
            </Card>
        </>
    );
  }