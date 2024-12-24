import { createTestServer } from "../../test-utils/testServer";
import { prisma, clearDatabase } from "../../test-utils/database";
import { IJobType, IUserRole } from "../../types/resolvers-types";

describe("createJob", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  it("creates a new job", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@test.com",
        password: "test",
        role: IUserRole.Admin,
      },
    });

    const testServer = createTestServer({
      context: {
        auth: {
          user: {
            id: user.id,
            isAdmin: user.role === IUserRole.Admin,
          },
        },
      },
    });

    const { data, errors } = await testServer.query({
      query: `#graphql
        mutation createJob($input: CreateJobInput!) {
          createJob(input: $input) {
            id
            title
            description
            type
            company {
              name
            }
          }
        }
      `,
      variables: {
        input: {
          title: "Test Job",
          description: "Test Description",
          type: IJobType.FullTime,
          companyName: "Test Company",
          location: "Test Location",
          remote: false,
          salary: 100000,
        },
      },
    });

    expect(errors).toBeUndefined();
    expect(data?.createJob).toMatchObject({
      id: expect.any(String),
      title: "Test Job",
      description: "Test Description",
      type: IJobType.FullTime,
      company: {
        name: "Test Company",
      },
    });
  });
});
