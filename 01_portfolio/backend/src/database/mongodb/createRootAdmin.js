import User from "../../models/UserModel.js";
import bcrypt from "bcryptjs";

export async function createRootAdmin() {
  const rootEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@shop.com";
  const rootPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";

  const admin = await User.findOne({ email: rootEmail });
  if (admin) return console.log("Root admin already exists");

  const hashedPassword = await bcrypt.hash(rootPassword, 10);

  await User.create({
    name: "Root Admin",
    email: rootEmail,
    password: hashedPassword,
    role: "admin",
    isRoot: true,
    emailVerified: true,
  });

  console.log("✅ Root admin created:", rootEmail);
}
