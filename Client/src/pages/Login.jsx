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
import { useState } from "react";

const Login = () => {
  const [signupValue, setSignupValue] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const [loginValue, setLoginValue] = useState({
    Email: "",
    Password: "",
  });
  const onChangeHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupValue({ ...signupValue, [name]: value });
    } else {
      setLoginValue({ ...loginValue, [name]: value });
    }
  };
  const onClickHandler = (type) => {
    const inputValue = type === "signup" ? signupValue : loginValue;
    console.log(inputValue);
  };
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
                name="Name"
                value={signupValue.Name}
                onChange={(e) => onChangeHandler(e, "signup")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input
                type="email"
                name="Email"
                value={signupValue.Email}
                placeholder="Eg. Saurabh@gmail.com"
                onChange={(e) => onChangeHandler(e, "signup")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input
                type="password"
                name="Password"
                value={signupValue.Password}
                placeholder="Eg. xyz"
                onChange={(e) => onChangeHandler(e, "signup")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                onClickHandler("signup");
              }}
            >
              Signup
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
                name="Email"
                value={loginValue.Email}
                placeholder="Eg. Saurabh@gmail.com"
                onChange={(e) => onChangeHandler(e, "login")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input
                type="password"
                name="Password"
                value={loginValue.Password}
                placeholder="Eg. xyz"
                onChange={(e) => onChangeHandler(e, "login")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                onClickHandler("login");
              }}
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  );
};

export default Login;
