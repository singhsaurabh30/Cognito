import { UserRepository } from "../repository/user-repository.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { createToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const response = await this.userRepository.getByEmail(data.email);
      if (response) {
        throw {
          message: "user already exist",
        };
      }
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong in service");
      throw error;
    }
  }
  async login(data) {
    try {
      const userData = await this.userRepository.getByEmail(data.email);
      if (!userData) {
        throw { message: "either password or email is wrong" };
      }
      const passStatus = await bcrypt.compare(data.password, userData.password);
      if (!passStatus) {
        throw { message: "either password or email is wrong" };
      }
      const token = createToken({
        userId: userData.id,
      });
      return { token, userData };
    } catch (error) {
      console.log("something went wrong while signing in");
      throw error;
    }
  }
  async getByUserId(id) {
    try {
      const user = await this.userRepository.getByUserId(id);
      if (!user) throw { message: "user not found" };
      return user;
    } catch (error) {
      console.log("something went wrong while signing in");
      throw error;
    }
  }
  async updateProfile(userId, name, profilePhoto) {
    try {
      const user = await this.userRepository.getByUserId(userId);
      if (!user) throw { message: "user not found" };
      if (user.profileUrl) {
        const publicId = user.profileUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      const cloudRes = await uploadMedia(profilePhoto.path);
      const photoUrl = cloudRes.secure_url;
      const updatedData = { name, photoUrl };
      const newUser = await this.userRepository.updateUser(userId, updatedData);
      return newUser;
    } catch (error) {
      console.log("something went wrong while updating user");
      throw error;
    }
  }
}
