import { useEffect, useState } from 'react';
import { Flex, Box, Text, Input, Spinner, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import { getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';

export default function SearchFilters() {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationData, setLocationData] = useState();
    const [showLocations, setShowLocations] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const searchProperties = (filterValues) => {
        const path = router.pathname;
        const { query } = router;

        const values = getFilterValues(filterValues)

        values.forEach((item) => {
            if (item.value && filterValues?.[item.name]) {
                query[item.name] = item.value
            }
        })

        router.push({ pathname: path, query: query });
    };

    useEffect(() => {
        if (searchTerm !== '') {
            const fetchData = async () => {
                setLoading(true);
                const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
                setLoading(false);
                setLocationData(data?.hits);
            };

            fetchData();
        }
    }, [searchTerm]);

    return (
        <>
            <Flex flexDir='column'>
                {showLocations && (
                    <Flex flexDir='column' pos='relative'>
                        <Input
                            placeholder='Enter any Location'
                            value={searchTerm}
                            w='full'
                            borderColor={"blue.50"}
                            background={"blue.50"}
                            fontSize={'lg'}
                            focusBorderColor='blue.50'
                            borderRadius={"1px"}
                            fontWeight={"bold"}
                            color={"black"}
                            height={'50px'}
                            border={'none'}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm !== '' && (
                            <Icon
                                as={MdCancel}
                                pos='absolute'
                                cursor='pointer'
                                right='5'
                                top='5'
                                zIndex='100'
                                onClick={() => setSearchTerm('')}
                            />
                        )}
                        {loading && <Spinner margin='auto' marginTop='3' marginBottom='3' />}
                        {showLocations && (
                            <Box height={'292px'} className="filterOption" overflow='auto'>
                                {locationData?.map((location) => (
                                    <Box
                                        key={location.id}
                                        onClick={() => {
                                            searchProperties({ locationExternalIDs: location.externalID });
                                            setShowLocations(false);
                                            setSearchTerm(location.name);
                                        }}
                                    >
                                        <Text cursor='pointer' p='2' fontWeight={"bold"} border='1px' borderBottom={"none"} borderColor='blue.50' >
                                            {location.name}
                                        </Text>
                                    </Box>
                                ))}
                                <Box>
                                    {!loading && !locationData?.length && (
                                        <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' >
                                            <Text fontWeight={'black'} fontSize={'lg'} marginTop='3'>
                                                Search!
                                            </Text>
                                        </Flex>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Flex>
                )}
            </Flex>
        </>
    )
}