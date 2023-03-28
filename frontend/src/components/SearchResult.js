import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Input,
  } from '@chakra-ui/react';
  
  
  export default function SearchResultCard() {
    return (
        <>
            <Card size='md'>
                <CardHeader>
                <Heading size='md'>Client Report</Heading> <Badge>Notion</Badge>
                </CardHeader>
            <CardBody>
                <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
                <HStack>
                    <HStack>
                    <Button> Chat with Doc </Button>
                    <Button> Preview Document </Button>
                    </HStack>
                </HStack>
            </CardFooter>
            </Card>
        </>
    );
  }