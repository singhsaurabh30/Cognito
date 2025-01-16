import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [signupValue, setSignupValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginValue, setLoginValue] = useState({
    name: "",
    password: "",
  });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const onChangeHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupValue({ ...signupValue, [name]: value });
    } else {
      setLoginValue({ ...loginValue, [name]: value });
    }
  };
  const onClickHandler = async (type) => {
    const inputValue = type === "signup" ? signupValue : loginValue;
    //console.log(inputValue);
    const action=type==="signup"?registerUser:loginUser;
    await action(inputValue);
  };
  useEffect(()=>{
    
    if(registerIsSuccess && registerData){
      toast.success(registerData.message|| "Signup Successfull")
    }
    if(registerError){
      toast.success(registerError.data.message||"Signup Failed")
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.message|| "Signup Successfull")
    }
    if(loginError){
      toast.success(loginError.data.message||"Signup Failed")
    }
  },[
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError
  ])
  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  placeholder="Eg. Saurabh"
                  name="name"
                  value={signupValue.name}
                  onChange={(e) => onChangeHandler(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupValue.email}
                  placeholder="Eg. Saurabh@gmail.com"
                  onChange={(e) => onChangeHandler(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupValue.password}
                  placeholder="Eg. xyz"
                  onChange={(e) => onChangeHandler(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
              disabled={registerIsLoading}
                onClick={() => {
                  onClickHandler("signup");
                }}
              >
                {
                  registerIsLoading?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</>
                  ):"SignUp"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginValue.email}
                  placeholder="Eg. Saurabh@gmail.com"
                  onChange={(e) => onChangeHandler(e, "login")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginValue.password}
                  placeholder="Eg. xyz"
                  onChange={(e) => onChangeHandler(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
              disabled={loginIsLoading}
                onClick={() => {
                  onClickHandler("login");
                }}
              >
                {
                  loginIsLoading?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</>
                  ):"Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
