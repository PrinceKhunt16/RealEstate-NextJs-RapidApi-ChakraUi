import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsCoin } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai'
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { baseUrl, fetchApi } from '../../utils/fetchApi';

const PropertyDetails = ({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos } }) => {
    return (
        <Box maxWidth='1000px' margin='auto' p='2'>
            <Box w='full' p='6'>
                <Box marginTop='2'>
                    <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{title}</Text>
                    <Text lineHeight='2' textAlign={"justify"} fontWeight={'bold'} fontSize={'l'} color='gray.600'>{description}</Text>
                </Box>
                <Flex display={"flex"} marginTop={"10px"} flexDirection={"column"} justifyContent='space-between'>
                    <Flex justifyContent='space-between' maxWidth='400px' borderBottom='1px' borderColor='gray.100' p='3' paddingLeft={"0px"}>
                        <Text fontWeight={"bold"}>Price</Text>
                        <Text width={"50%"} fontWeight='bold'>{millify(price)} {rentFrequency && `/${rentFrequency}`}</Text>
                    </Flex>
                    <Flex justifyContent='space-between' maxWidth='400px' borderBottom='1px' borderColor='gray.100' p='3' paddingLeft={"0px"}>
                        <Text fontWeight={"bold"}>Bed</Text>
                        <Text width={"50%"} fontWeight='bold'>{rooms}</Text>
                    </Flex>
                    <Flex justifyContent='space-between' maxWidth='400px' borderBottom='1px' borderColor='gray.100' p='3' paddingLeft={"0px"}>
                        <Text fontWeight={"bold"}>Bath</Text>
                        <Text width={"50%"} fontWeight='bold'>{baths}</Text>
                    </Flex>
                    <Flex justifyContent='space-between' maxWidth='400px' borderBottom='1px' borderColor='gray.100' p='3' paddingLeft={"0px"}>
                        <Text fontWeight={"bold"}>Area</Text>
                        <Text width={"50%"} fontWeight='bold'>{millify(area)} sqft</Text>
                    </Flex>
                    <Flex justifyContent='space-between' maxWidth='400px' borderBottom='1px' borderColor='gray.100' p='3' paddingLeft={"0px"}>
                        <Text fontWeight={"bold"}>Type</Text>
                        <Text width={"50%"} fontWeight='bold'>{type}</Text>
                    </Flex>
                    <Flex justifyContent='space-between' maxWidth='400px' borderBottom='1px' borderColor='gray.100' p='3' paddingLeft={"0px"}>
                        <Text fontWeight={"bold"}>Purpose</Text>
                        <Text width={"50%"} fontWeight='bold'>{purpose}</Text>
                    </Flex>
                    {furnishingStatus && (
                        <Flex justifyContent='space-between' maxWidth='400px' borderBottom='1px' borderColor='gray.100' p='3' paddingLeft={"0px"}>
                            <Text fontWeight={"bold"}>Furnishing Status</Text>
                            <Text width={"50%"} fontWeight='bold'>{furnishingStatus}</Text>
                        </Flex>
                    )}
                </Flex>
                <Box>
                    {amenities.length && <Text fontSize='lg' marginBottom='2' fontWeight='bold' marginTop='5'>Facilites</Text>}
                    <Flex flexWrap='wrap' justifyContent={"space-between"}>
                        {amenities?.map((item) => (
                            item?.amenities?.map((amenity) => (
                                <Text key={amenity.text} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='blue.50' m='1' borderRadius='5'>
                                    {amenity.text}
                                </Text>
                            ))
                        ))}
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

    return {
        props: {
            propertyDetails: data,
        },
    };

}