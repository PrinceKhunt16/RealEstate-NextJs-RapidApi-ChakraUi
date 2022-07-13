import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import SearchFilters from '../components/SearchFilters';
import LocationFilter from "../components/LocationFilter"
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';

export default function Search({ properties }) {
    const [searchFilters, setSearchFilters] = useState(false);
    const [locationFilter, setLocationFilter] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex
                onClick={() => setSearchFilters(!searchFilters)}
                cursor={'pointer'}
                bg={'blue.50'}
                borderBottom={'1px'}
                borderColor={'blue.100'}
                p={'3'}
                fontWeight={'bold'}
                fontSize={'xl'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Text>Search Property By Filters</Text>
            </Flex>
            {searchFilters && <SearchFilters />}
            <Flex
                onClick={() => setLocationFilter(!locationFilter)}
                cursor={'pointer'}
                bg={'blue.50'}
                borderBottom={'1px'}
                borderColor={'blue.100'}
                p={'3'}
                fontWeight={'bold'}
                fontSize={'xl'}
                justifyContent={'center'}
                alignItems={'center'}
                marginTop={"8px"}
            >
                <Text>Search Property By Location</Text>
            </Flex>
            {locationFilter && <LocationFilter />}
            <Text fontSize='2xl' p='4' fontWeight='bold'>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap='wrap'>
                {properties.map((property) => <Property property={property} key={property.id} />)}
            </Flex>
            {properties.length === 0 && (
                <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
                    <Text fontSize='2xl' p='4' fontWeight='bold'>No Result Found.</Text>
                </Flex>
            )}
        </Box>
    )

}

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';

    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

    return {
        props: {
            properties: data?.hits
        }
    }

}