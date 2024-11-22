import type { Resolvers, UserRole } from "../../types/resolvers-types";

const resolvers: Resolvers = {
  Query: {
    me: async (root, args, context) => {
      if (!context.auth.user.id) {
        throw new Error("Unauthorized");
      }

      const user = await context.prisma.user.findUnique({
        where: { id: context.auth.user.id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return {
        ...user,
        role: user.role as UserRole,
      };
    },
  },
  Mutation: {
    signup: async (root, args, context) => {
      const { email, name, role, password } = args;

      // Create user in database
      const user = await context.prisma.user.create({
        data: {
          email,
          name,
          role,
          // In production, hash the password before storing
          password,
        },
      });

      context.auth.login(user.id);

      return {
        ...user,
        role: user.role as UserRole,
      };
    },
    login: async (root, args, context) => {
      const { email, password } = args;

      // Find user by email
      const user = await context.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // In production, compare hashed passwords
      if (user.password !== password) {
        throw new Error("Invalid email or password");
      }

      context.auth.login(user.id);

      return {
        ...user,
        role: user.role as UserRole,
      };
    },
  },
};

export default resolvers;
