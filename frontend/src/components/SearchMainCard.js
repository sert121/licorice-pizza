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
    Divider,
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
    const [preview, setPreview] = React.useState(false)

    let defaultState = {
        y:-20,
        scale:1,
    }
    let transformedState = {
        scale: [1, 2],
        borderRadius: ["0%", "10%"]
    }

    const handleToggle = () => setIsExpanded(!isExpanded)
    const handlePreview = () => setPreview(!preview)

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
                        <Heading size='md'>Roadmap</Heading> <Badge  fontSize={'0.8em'} variant={'subtle'} colorScheme='pink'>Notion</Badge></HStack>
         
                </CardHeader>
            <CardBody margin={0}>
                <Stack margin={0}>
                <Text paddingBottom={2} align={'left'}>
                    <Collapse startingHeight={20} in={isExpanded}>
                    The Product Roadmap outlines tasks to be completed over two months. In the first month, user research is conducted to identify pain points, features are prioritized based on the research, the onboarding process is enhanced, and a referral program is implemented. In the second month, new features are developed and launched based on user feedback. 
                    The product's analytics capabilities are improved, a social media campaign is launched, and an email marketing campaign is developed.
                    </Collapse>

                </Text>
                {preview &&
                            <>
                        <Divider></Divider>
                            {/* <Badge> Source</Badge> */}
                            <Heading paddingTop={2} size='xs' color={'blue.300'} align={'left'}> Preview</Heading>
                            <Text  align={'left'}>
                            Product Roadmap<br></br>1Product Roadmap<br></br>Month 1:<br></br>Conduct user research to identify pain points and areas of improvement for the  <br></br>product.<br></br>Use the insights gained from user research to prioritize feature development for  <br></br>the next quarter .<br></br>Enhance the onboarding process to improve the user experience and reduce  <br></br>churn.<br></br>Implement a referral program to incentivize current users to refer new users.<br></br>Month 2:<br></br>Develop and launch new features based on user research, prioritization, and  <br></br>feedback.<br></br>Improve the product's analytics capabilities to provide users with better insights  <br></br>and reporting.<br></br>Launch a social media campaign to increase brand awareness and drive traf fic <br></br>to the website.<br></br>Run an email marketing campaign to promote the new features and encourage  <br></br>user engagement.<br></br>Month 3:<br></br>Conduct A/B testing to optimize the user interface and improve user  <br></br>engagement.<br></br>Expand the product's integrations with other software tools to increase its  <br></br>functionality and appeal to new users.<br></br>Launch a paid advertising campaign to drive targeted traf fic to the website and  <br></br>increase conversions.<br></br>Continue to gather user feedback and iterate on the product to improve the user  <br></br>experience and drive growth.<br></br>Overall, this product roadmap focuses on understanding user needs and developing  <br></br>the product accordingly , while also promoting the product to potential new users
                            </Text>
                        </>
                    }

                </Stack>
            </CardBody>
            <CardFooter paddingTop={0}>
                <HStack>
                    <HStack>
                    <Button onClick={handlePreview} colorScheme='blue' size={'sm'} variant='outline'> Preview Document </Button>

                    <Button size={'sm'} onClick={handleToggle} colorScheme='blue' variant='ghost'> Show {isExpanded ? 'Less' : 'More'} </Button>
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