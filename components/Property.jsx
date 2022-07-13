import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsCoin } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { AiFillHome } from 'react-icons/ai'
import millify from "millify";
import DefaultImage from "../assets/images/house.jpg"

const breakpoints = {
    sm: '100%',
    md: '50%',
    lg: '33.33333%',
    xl: '33.33333%'
}

const Property = ({ property: { coverPhoto, price, rentFrequency, contactName, rooms, baths, area, agency, isVerified, externalID, location } }) => (
    <Link href={`/property/${externalID}`} passHref>
        <Flex className="cardBody" flexWrap='wrap' width={breakpoints} paddingTop='0px' justifyContent='flex-start' cursor='pointer' >
            <Box background={"blue.50"} w='full' borderRadius={"1px"}>
                <Box w='full' className="homeCardImageBox">
                    <Image src={coverPhoto ? coverPhoto.url : DefaultImage} width={400} height={266} />
                </Box>
                <Box p={"3"} paddingTop={"6px"} display={"flex"}>
                    <Box paddingBottom={"7px"} display={'flex'}>
                        <Box position={"reletive"} paddingRight='2' >
                            <Avatar size='md' border={"1px solid blue.700"} src={agency?.logo?.url}></Avatar>
                        </Box>
                    </Box>
                    <Box paddingTop={"10px"}>
                        <Box paddingTop={"0px"} paddingBottom={"5px"} display={"flex"} alignItems={"center"}>
                            <Box paddingRight='1' color='blue.400'>{isVerified && <GoVerified />}</Box>
                            <Text fontWeight='bold' color='black' fontSize='lg'>{contactName}</Text>
                        </Box>
                        <Flex alignItems='flex-start' paddingTop={"0px"} paddingBottom={"6px"} color='blue.400' fontWeight='bold' fontSize='lg' justifyContent='flex-start' gap={"4"} flexDirection={"row"}>
                            <Box display={"flex"} alignItems={"center"}>
                                <BsCoin /> <Box color='black' marginLeft={"1"}> {millify(price)} {rentFrequency && `/${rentFrequency}`} </Box>
                            </Box>
                        </Flex>
                        <Flex alignItems='flex-start' paddingTop={"0px"} color='blue.400' fontWeight='bold' fontSize='lg' justifyContent='flex-start' gap={"4"} flexDirection={"row"}>
                            <Box display={"flex"} alignItems={"center"}>
                                <FaBed /> <Box color='black' marginLeft={"2"}> {rooms} </Box>
                            </Box>
                            <Box display={"flex"} alignItems={"center"}>
                                <FaBath /> <Box color='black' marginLeft={"2"}> {baths} </Box>
                            </Box>
                            <Box display={"flex"} alignItems={"center"}>
                                <AiFillHome /> <Box color='black' marginLeft={"2"}> {millify(area)} sqft </Box>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Flex>
    </Link>
)

export default Property;