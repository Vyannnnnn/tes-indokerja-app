import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { signToken } from "../utils/jwt";
import { Role } from "@prisma/client";

export const register = async (data: {
  email: string;
  password: string;
  name: string;
  role: Role;
}) => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) throw { status: 409, message: "Email already registered" };

  const user = await prisma.user.create({
    data: { ...data, password: await bcrypt.hash(data.password, 10) },
  });

  const token = signToken({ id: user.id, role: user.role });
  return {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token,
  };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 401, message: "Invalid credentials" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: "Invalid credentials" };

  const token = signToken({ id: user.id, role: user.role });
  return {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token,
  };
};
