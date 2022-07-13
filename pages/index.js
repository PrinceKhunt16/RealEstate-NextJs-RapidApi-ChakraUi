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
  base: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block'
}

const fontSizeSecondDiv = {
  base: '3xl', sm: '4xl', md: '5xl', lg: '7xl', xl: '8xl'
}

const fontOfTwoComponents = {
  base: '4xl', sm: '4xl', md: '5xl', lg: '5xl', xl: '5xl'
}

export default function Home({ propertiesForRent, propertiesForSale }) {
  return (
    <Box>
      <Box display={"flex"} flexWrap={"wrap"} paddingTop={"12"} paddingBottom={"12"} background={"blue.100"} alignItems={"center"}>
        <Box padding={"5"} width={firstDiv}>
          <Text fontSize='xl' color='gray.700' fontWeight='bold' paddingBottom={"2"}>Rent and Buy homes</Text>
          <Text fontSize={'5xl'} fontWeight='bold'>Rental and Buy Homes for Everyone</Text>
          <Text fontSize='xl' fontWeight='bold' paddingTop='5' paddingBottom='3' color='gray.800'>Explore from Apartments, builder floors, villas and more</Text>
        </Box>
        <Box display={secondDivDisplay} width={secondDiv}>
          <Text fontSize={fontSizeSecondDiv} opacity={"0.8"} textAlign={"center"} color='blue.500' fontWeight='normal'>
            Real Estate
          </Text>
        </Box>
      </Box>
      <Box>
        <Text fontSize={fontOfTwoComponents} fontWeight='bold' padding={"5"} paddingTop={"30px"} paddingLeft={"0"} textAlign={"center"}>
          Rental Homes
        </Text>
      </Box>
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Text fontSize={fontOfTwoComponents} padding={"5"} paddingLeft={"0"} paddingTop={"10px"} textAlign={"center"} fontWeight='bold'>
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