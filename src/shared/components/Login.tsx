
import { Box, Button,IconButton, InputAdornment,Paper,TextField, Typography, useTheme } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useAuthContext } from "../contexts/AuthProvider";
import * as yup from 'yup'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motionUi } from "./MotionUI";


interface ILogin{
  children:React.ReactNode;
}
const validateSchema=yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(8).required()
})

export const Login:React.FC<ILogin>=({children})=>{

  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState<string>("")
  const [password,setPassword]=useState<string>("")
  const [emailError,setEmailError]=useState<string>()
  const [passwordError,setPasswordError]=useState<string>()
  
  const theme=useTheme()
  const {isAuthenticated,login}=useAuthContext()

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>  event.preventDefault();
  

  const handleSubmit=()=>{
      validateSchema.validate({email,password},{abortEarly:false})
      .then((res)=>{
          login(res.email,res.password)
          setPassword("")
          setEmail("")
          setEmailError(undefined)
          setPasswordError(undefined)
      }).catch((err: yup.ValidationError)=>{
          err.inner.forEach((errors)=>{
              if(errors.path === 'email'){
                  setEmailError(errors.message)
              }
              if(errors.path === 'password'){
                  setPasswordError(errors.message)
              }
          })
      })
  }
   

    if(isAuthenticated)return <>{children}</>
    
    return(
        <Box display="flex"  width="100vw" height="100vh" justifyContent="center" alignItems="center">

        <motionUi.box component={Paper} display="flex"flexDirection="column"  border="1px solid black" alignItems="center"   padding={theme.spacing(2)} gap={theme.spacing(2)} 
            initial={{y:"-100vw"}}
            animate={{y:0}}
            transition={{ease:"easeInOut", duration:2}}
        >
            <Typography variant="h5">Login</Typography>
                <TextField 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                fullWidth
                required
                label="Email"
                type="email"
                variant="standard"
                helperText={emailError}
                error={!!emailError}
                onKeyDown={()=>setEmailError(undefined)}
            />
                <TextField
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                fullWidth
                variant="standard"
                type={showPassword ? "text": "password"}
                label="Password"
                onKeyDown={()=> setPasswordError(undefined)}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </motionUi.box>
                </Box>
    )
                }
                
