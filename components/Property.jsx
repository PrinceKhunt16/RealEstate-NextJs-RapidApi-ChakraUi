import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from "millify";
import DefaultImage from "../assets/images/house.jpg"

const breakpoints = {
    sm: '100%',
    md: '50%',
    lg: '33.33333%',
    xl: '33.33333%'
}

const Property = ({ property: { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID } }) => (
    <Link href={`/property/${externalID}`} passHref>
        <Flex className="cardBody"  flexWrap='wrap' w={breakpoints} paddingTop='0px' justifyContent='flex-start' cursor='pointer' >
            <Box background={"#4299e114"} w='full' borderRadius={"1px"}>
                <Box w='full' className="homeCardImageBox">
                    <Image src={coverPhoto ? coverPhoto.url : DefaultImage} width={400} height={266} />
                </Box>
                <Box w='full' p="3" paddingTop={"0px"} position={"relative"}>
                    <Flex alignItems='flex-start' justifyContent='space-between'>
                        <Flex alignItems='center'>
                            <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
                            <Text fontWeight='bold' fontSize='lg'>Price {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
                        </Flex>
                    </Flex>
                    <Box position={"absolute"} right={2.5} top={0}>
                        <Avatar size='md' border={"1px solid #edf2f7"} src={agency?.logo?.url}></Avatar>
                    </Box>
                    <Flex alignItems='flex-start' paddingTop={1.5} fontSize={"lg"} justifyContent='flex-start' gap={"7"} flexDirection={"row"} color='blue.400'>
                        <Box display={"flex"} alignItems={"center"}>
                            <FaBed /> <Box marginLeft={"2"} fontFamily={"sans-serif"}> {rooms} </Box>
                        </Box>
                        <Box display={"flex"} alignItems={"center"}>
                            <FaBath /> <Box marginLeft={"2"} fontFamily={"sans-serif"}> {baths} </Box>
                        </Box>
                        <Box display={"flex"} alignItems={"center"}>
                            <BsGridFill /> <Box marginLeft={"2"} fontFamily={"sans-serif"}> {millify(area)} sqft </Box>
                        </Box>
                    </Flex>
                    <Text fontWeight='bold' fontSize='lg' paddingTop={1.5} >
                        {title.length > 30 ? title.substring(0, 80) + '...' : title}
                    </Text>
                </Box>
            </Box>
        </Flex>
    </Link>
)

export default Property;