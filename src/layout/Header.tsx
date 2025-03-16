import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import {LoginSharp, LogoutSharp, MenuRounded, Person} from "@mui/icons-material";
import ColorSchemeToggle from "../components/common/ColorSchemeToggle.tsx";
import Tooltip from "@mui/material/Tooltip";
import {Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/redux/configureStore.ts';
import { logoutCleanUp } from '../app/redux/slices/AuthSlice.ts';
// import BasketDialog from "../components/basket/BasketDialog";
// import { useState } from 'react';
// import { calculateBasketTotal, getBasket } from '../store/slices/BasketSlice.ts';
import { useLogoutMutation } from '../app/api/authApi.ts';

export default function Header() {
  const dispatch = useAppDispatch();
  const {isAuthenticated} = useAppSelector(state => state.auth);
  const [logout, { isError, error }] = useLogoutMutation();
  
  // Fix: Safely parse user data from localStorage with proper null checking
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  
  // const [basketOpen, setBasketOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutCleanUp());  
    } catch (ex) {
      console.log(error, ex);
    }
  }
  // const openBasketDialog = () => {
  //   setBasketOpen(true);
  //   if (isAuthenticated) {
  //     dispatch(getBasket(user?.id ?? 0));
  //     dispatch(calculateBasketTotal())
  //   }
  // }

  if (isError) {
    return <div className="text-red-500 text-center p-4">Login error</div>;
  }

  return (
    <Box sx={{
      display: 'flex', 
      flexGrow: 1, 
      justifyContent: 'space-between', 
      borderBottom: "1px solid"
      }}>
      <Box sx={{
        display: {xs: 'none', sm: 'flex'}, 
        flexDirection: 'row', 
        alignItems: 'center'}}>
        {/*<LocalLaundryServiceSharp*/}
        {/*  color={"secondary"}*/}
        {/*  sx={{*/}
        {/*    display: {xs: 'none', sm: 'flex'},*/}
        {/*    minHeight: "64px",*/}
        {/*    fontSize: "34px"*/}
        {/*  }}/>*/}
        <Typography fontWeight={700} fontSize={22}>Sport Blitz League</Typography>
      </Box>
      <Stack
        display={"flex"}
        direction="row"
        spacing={1}
        sx={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          display: {xs: 'none', sm: 'flex'},
          alignSelf: 'center'
        }}
      >
        {/*<Button*/}
        {/*  href={"/services"}*/}
        {/*  sx={{alignSelf: 'center'}}*/}
        {/*>*/}
        {/*  */}
        {/*</Button>*/}
      </Stack>
      <Box sx={{display: {xs: 'inline-flex', sm: 'none'}}}>
        <IconButton>
          <MenuRounded/>
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        {/*<Tooltip title={"Basket"}>*/}
        {/*  <IconButton*/}
        {/*    color={"secondary"}*/}
        {/*    onClick={openBasketDialog}*/}
        {/*  >*/}
        {/*    <ShoppingCart/>*/}
        {/*  </IconButton>*/}
        {/*</Tooltip>*/}
        <ColorSchemeToggle/>
        <IconButton
          href={isAuthenticated 
            ? (user?.role === 1 ? '/admin/orders' : '/profile')
            : '/'}
          color='secondary'
          sx={{maxWidth: '32px', maxHeight: '32px'}}
        >
          <Person/>
        </IconButton>
        <Tooltip title={"Log in/Register"}>
          <IconButton
            href={"/login"}
            color={"secondary"}
            sx={{maxWidth: '32px', maxHeight: '32px'}}
          >
            <LoginSharp/>
          </IconButton>
        </Tooltip>
        <IconButton
          color='secondary'
          onClick={handleLogout}
        >
          <LogoutSharp/>
        </IconButton>
        </Box>
        {/*<BasketDialog*/}
        {/*  open={basketOpen}*/}
        {/*  onClose={() => {*/}
        {/*    setBasketOpen(false)}*/}
        {/*  }*/}
        {/*/>*/}
    </Box>
  );
}
