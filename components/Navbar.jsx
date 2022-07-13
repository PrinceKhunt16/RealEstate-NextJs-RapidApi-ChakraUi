import Link from 'next/link';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';

const Navbar = () => {
    return (
        <Flex p='3' borderColor='gray.100'>
            <Box fontSize='3xl' color='blue.500' fontWeight='medium'>
                <Link href='/' paddingLeft='2'>Real Estate</Link>
            </Box>
            <Spacer />
            <Box className='headerNavBtn'>
                <Menu>
                    <MenuButton className='navBtn' as={IconButton} icon={<FcMenu />} variant='outline' color='red.400' />
                    <MenuList>
                        <Link href='/' passHref>
                            <MenuItem icon={<FcHome />}>Home</MenuItem>
                        </Link>
                        <Link href='/search' passHref>
                            <MenuItem icon={<BsSearch />}>Search</MenuItem>
                        </Link>
                        <Link href='/search?purpose=for-sale' passHref>
                            <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
                        </Link>
                        <Link href='/search?purpose=for-rent' passHref>
                            <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    )
}

export default Navbar