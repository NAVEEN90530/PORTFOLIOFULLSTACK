import User from "../models/User.js";
import bcrypt from "bcryptjs";

const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: "admin" });

    if (adminExists) {
      console.log("✔ Admin already exists");
      return;
    }

    const plainPassword = process.env.PASSWORD ; // fallback
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await User.create({
      username: "admin",
      password: hashedPassword,
    });

    console.log("🎉 Default Admin Created Successfully");
    console.log("👉 Username: admin");
     console.log("👉 Password:", hashedPassword);
    console.log("👉 Password:", plainPassword);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  }
};

export default createAdmin;
