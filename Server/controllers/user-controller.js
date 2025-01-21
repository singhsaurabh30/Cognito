import { UserService } from "../services/user-service.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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
    console.log("in contro");
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
        success: true,
        message: `Welcome back ${response.userData.name}`,
        user: response.userData,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user failed to login",
      err: { error },
    });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logout successfull",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user failed to logout",
      err: { error },
    });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const user = await userService.getByUserId(req.id);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to load user",
      err: { error },
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const name = req.body.name;
    const photoPhoto = req.file;
    const updateUser = await userService.updateProfile(
      userId,
      name,
      photoPhoto
    );
    return res.status(200).json({
      success: true,
      updateUser,
      message: "profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to updated user",
      err: { error },
    });
  }
};
