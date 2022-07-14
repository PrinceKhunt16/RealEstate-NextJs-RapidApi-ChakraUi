import { Flex, Box, Text } from "@chakra-ui/react";
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from "../components/Property"

const bannerDivImagePartWidth = {
  sm: '100%', md: '100%', lg: '60%', xl: '60%'
}

const bannerDivLogoWidth = {
  sm: '0%', md: '0%', lg: '40%', xl: '40%'
}

const bannerDivLogoDisplay = {
  base: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block'
}

const bannerDivLogoFont = {
  base: '3xl', sm: '4xl', md: '5xl', lg: '7xl', xl: '8xl'
}

const fontOfRentAndSellHeading = {
  base: '4xl', sm: '4xl', md: '5xl', lg: '5xl', xl: '5xl'
}

export default function Home({ propertiesForRent, propertiesForSale }) {
  return (
    <Box>
      <Box display={"flex"} flexWrap={"wrap"} background={"blue.100"} alignItems={"center"}>
        <Box width={bannerDivImagePartWidth}>
          <img className="bannerimage" style={{ width: "100%", height: "430px", objectFit: "cover" }} src="https://images7.alphacoders.com/110/thumb-1920-1108495.png" alt="homepage photo" />
        </Box>
        <Box width={bannerDivLogoWidth} display={bannerDivLogoDisplay}>
          <Text fontSize={bannerDivLogoFont} opacity={"0.8"} textAlign={"center"} color='blue.500' fontWeight='normal'>
            Real Estate
          </Text>
        </Box>
      </Box>
      <Box>
        <Text fontSize={fontOfRentAndSellHeading} fontWeight='bold' padding={"5"} paddingTop={"30px"} paddingLeft={"0"} textAlign={"center"}>
          Rental Homes
        </Text>
      </Box>
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Text fontSize={fontOfRentAndSellHeading} padding={"5"} paddingLeft={"0"} paddingTop={"10px"} textAlign={"center"} fontWeight='bold'>
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