import { UserService } from "../services/user-service.js";

const userService = new UserService();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "something missing",
        err: {},
      });
    }
    const response = await userService.create({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "user registered",
      user: response,
      err: {},
    });
  } catch (error) {
    console.log("in contro")
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user failed to registered",
      err: error,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "something missing",
        err: {},
      });
    }
    const response = await userService.login({ email, password });
    return res
      .status(200)
      .cookie("token", response.token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success:true,
        message:`Welcome back ${response.userData.name}`,
        user:response.userData
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user failed to login",
      err: { error },
    });
  }
};
