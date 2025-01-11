import { prisma, clearDatabase } from "../../test-utils/database";
import { createTestServer } from "../../test-utils/testServer";
import { IUserRole } from "../../types/resolvers-types";

describe("login", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  it("logs the user in", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@test.com",
        password: "password",
        role: IUserRole.User,
      },
    });

    const mockLogin = jest.fn();
    const testServer = createTestServer({
      context: {
        auth: {
          login: mockLogin,
        },
      },
    });

    const { data } = await testServer.query({
      query: `#graphql
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            id
          }
        }
      `,
      variables: {
        input: {
          email: "test@test.com",
          password: "password",
        },
      },
    });

    expect(data?.login).toEqual({
      id: user.id,
    });

    expect(mockLogin).toHaveBeenCalledWith({
      id: user.id,
      isAdmin: false,
    });
  });
});
