import { IResolvers, IUserRole } from "../../types/resolvers-types";

const resolvers: IResolvers = {
  User: {
    appliedJobs: async (user, args, context) => {
      return context.prisma.job.findMany({
        where: { applicants: { some: { id: user.id } } },
      });
    },
    ownedJobs: async (user, args, context) => {
      if (!context.auth.user?.isAdmin) {
        return [];
      }

      return context.prisma.job.findMany({
        where: { ownerId: user.id },
      });
    },
  },
  Query: {
    me: async (root, args, context) => {
      if (!context.auth.user) {
        return null;
      }

      const user = await context.prisma.user.findUnique({
        where: { id: context.auth.user.id },
      });

      if (!user) {
        return null;
      }

      return {
        ...user,
        role: user.role as IUserRole,
      };
    },
  },
  Mutation: {
    signup: async (root, args, context) => {
      const { email, name, role, password } = args.input;

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

      context.auth.login({
        id: user.id,
        isAdmin: user.role === IUserRole.Admin,
      });

      return {
        ...user,
        role: user.role as IUserRole,
      };
    },
    login: async (root, args, context) => {
      const { email, password } = args.input;

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

      context.auth.login({
        id: user.id,
        isAdmin: user.role === IUserRole.Admin,
      });

      return {
        ...user,
        role: user.role as IUserRole,
      };
    },
    logout: async (root, args, context) => {
      context.auth.logout();
      return true;
    },
  },
};

export default resolvers;
