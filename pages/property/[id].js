import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = ({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos } }) => {
    return (
        <Box maxWidth='1000px' margin='auto' p='4'>
            {photos && <ImageScrollbar data={photos} />}
            <Box w='full' p='6'>
                <Flex paddingTop='2' alignItems='center'>
                    <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
                    <Text fontWeight='bold' fontSize='lg'>
                        Price {price} {rentFrequency && `/${rentFrequency}`}
                    </Text>
                    <Spacer />
                    <Avatar size='sm' src={agency?.logo?.url}></Avatar>
                </Flex>
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
                <Box marginTop='2'>
                    <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{title}</Text>
                    <Text lineHeight='2' color='gray.600'>{description}</Text>
                </Box>
                <Flex display={"flex"} flexDirection={"column"} justifyContent='space-between'>
                    <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                        <Text>Type</Text>
                        <Text fontWeight='bold'>{type}</Text>
                    </Flex>
                    <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                        <Text>Purpose</Text>
                        <Text fontWeight='bold'>{purpose}</Text>
                    </Flex>
                    {furnishingStatus && (
                        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
                            <Text>Furnishing Status</Text>
                            <Text fontWeight='bold'>{furnishingStatus}</Text>
                        </Flex>
                    )}
                </Flex>
                <Box>
                    {amenities.length && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilites:</Text>}
                    <Flex flexWrap='wrap'>
                        {amenities?.map((item) => (
                            item?.amenities?.map((amenity) => (
                                <Text key={amenity.text} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
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