import Link from "next/link"
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from "../components/Property"

const firstDiv = {
  sm: '100%', md: '65%', lg: '60%', xl: '50%'
}

const secondDiv = {
  sm: '100%', md: '35%', lg: '40%', xl: '50%'
}

const secondDivDisplay = {
  sm: 'none', md: 'block', lg: 'block', xl: 'block'
}

const fontSizeSecondDiv = {
  sm: '6xl', md: '5xl', lg: '7xl', xl: '8xl'
}

export default function Home({ propertiesForRent, propertiesForSale }) {
  console.log(propertiesForRent);
  return (
    <Box>
      <Box display={"flex"} flexWrap={"wrap"} paddingTop={"12"} paddingBottom={"12"} background={"blue.100"} alignItems={"center"}>
        <Box padding={"5"} width={firstDiv}>
          <Text fontSize='xl' color='gray.700' fontWeight='bold' paddingBottom={"2"}>Rent and Buy homes</Text>
          <Text fontSize='5xl' fontWeight='bold' lineHeight={"60px"}>Rental and Buy Homes for Everyone</Text>
          <Text fontSize='xl' fontWeight='bold' paddingTop='5' paddingBottom='3' color='gray.800'>Explore from Apartments, builder floors, villas and more</Text>
        </Box>
        <Box display={secondDivDisplay} width={secondDiv}>
          <Text fontSize={fontSizeSecondDiv} opacity={"0.8"} textAlign={"center"} color='blue.500' fontWeight='normal'>
            Real Estate
          </Text>
        </Box>
      </Box>
      <Box>
      <Text fontSize='5xl' fontWeight='bold' padding={"5"} paddingLeft={"0"} textAlign={"center"}>
        Rental Homes
      </Text>
      </Box>
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Text fontSize='5xl' textAlign={"center"} fontWeight='bold' padding={"5"} paddingLeft={"0"}>
        Find and Buy
      </Text>
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertiesForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertiesForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      propertiesForSale: propertiesForSale?.hits,
      propertiesForRent: propertiesForRent?.hits
    }
  }

}