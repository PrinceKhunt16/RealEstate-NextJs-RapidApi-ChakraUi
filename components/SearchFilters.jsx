import { useState } from 'react';
import { Flex, Select, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { filterData, getFilterValues } from '../utils/filterData';

export default function SearchFilters() {
    const [filters] = useState(filterData);
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

    return (
        <>
            <Flex bg='blue.50' p='4' justifyContent='flex-start' flexWrap='wrap'>
                {filters?.map((filter) => (
                    <Box key={filter.queryName}>
                        <Select focusBorderColor='blue.50' borderColor={"blue.100"} borderRadius={"2px"} background={"blue.100"} fontWeight={"bold"} onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })} placeholder={filter.placeholder} w='fit-content' p='2' >
                            {filter?.items?.map((item) => (
                                <option value={item.value} key={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                ))}
            </Flex>
        </>
    )
}