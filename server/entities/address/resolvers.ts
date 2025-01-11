import type { IResolvers } from "../../types/resolvers-types";

const resolvers: IResolvers = {
  Address: {
    __resolveType(obj) {
      return obj.hasOwnProperty("zip") ? "USAddress" : "UKAddress";
    },
  },
};

export default resolvers;
