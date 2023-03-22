
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
    Grid,
    Spacer,
    Input,
  } from '@chakra-ui/react';
  import React from 'react';
  

export default function UploadStuff() {

    const [file, setFile] = React.useState();

    const handleFileChange = (e) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
        console.log('bhai')
        console.log(e.target.files[0])
      }
    };
  
    const handleUploadClick = () => {
      if (!file) {
        return;
      }
      fetch('https://httpbin.org/post', {
        method: 'POST',
        body: file,
        // 👇 Set headers manually for single file upload
        headers: {
          'content-type': file.type,
          'content-length': `${file.size}`, // 👈 Headers need to be a string
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data, 'uploaded'))
        .catch((err) => console.error(err, 'error'));

    };


    return (
        <Grid p={5} gap={0} templateColumns="repeat(auto-fit, minmax(350px, 1fr))">
        <Stack spacing={6} direction={'row'} justifyContent="center" alignItems="space-around">
          <Box
            backgroundColor="white"
            boxShadow="md"
            borderRadius="md"
        
            p={26}
            flexDirection="column"
            display="flex"
            justifyContent="center"
            width="100%"
            height="20vh"
            alignItems="space-between"
          >
            <Text fontSize="md" fontWeight="bold" color="blue.800" pb={2}>
                Fetch Legal Documents Locally
            </Text>
            <Input type={'file'} borderWidth={'0em'} p={2} pb={8} onChange={handleFileChange}></Input>
            <Button onClick={handleUploadClick} p={2} mt={4} variant="solid" size="md">
              Embed
            </Button>
          </Box>

          <Box
            backgroundColor="white"
            boxShadow="md"
            borderRadius="md"
        
            p={26}
            flexDirection="column"
            display="flex"
            justifyContent="center"
            width="100%"
            height="20vh"
            alignItems="space-between"
          >
            <Text fontSize="md" fontWeight="bold" color="blue.700" pb={2}>
                Upload Notion Database
            </Text>
            <Input type={'file'} borderWidth={'0em'} p={2} pb={8} onChange={handleFileChange}></Input>
            <Button onClick={handleUploadClick} p={2} mt={4} variant="solid" size="md">
              Embed
            </Button>
          </Box>


        </Stack>
        
      </Grid>
      )
    }
