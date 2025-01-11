import { createTestServer } from "../../test-utils/testServer";
import { clearDatabase, prisma } from "../../test-utils/database";
import { IJobType, IUserRole } from "../../types/resolvers-types";

describe("User.appliedJobs", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  it("returns the jobs that the user has applied to", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@test.com",
        password: "test",
        role: IUserRole.User,
      },
    });

    const company = await prisma.company.create({
      data: {
        name: "Test Company",
      },
    });

    const jobData = {
      title: "Test Job",
      description: "Test Description",
      type: IJobType.FullTime,
      ownerId: user.id,
      remote: false,
      location: "Test Location",
      salary: 100000,
      companyId: company.id,
    };

    const job1 = await prisma.job.create({
      data: {
        ...jobData,
        applicants: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    const job2 = await prisma.job.create({
      data: {
        ...jobData,
        applicants: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const testServer = createTestServer({
      context: {
        auth: {
          user: { id: user.id },
        },
      },
    });

    const { data } = await testServer.query({
      query: `#graphql
        query {
          me {
            id
            appliedJobs {
              id
            }
          }
        }
      `,
      variables: {},
    });

    expect(data?.me).toEqual({
      id: user.id,
      appliedJobs: expect.arrayContaining([{ id: job1.id }, { id: job2.id }]),
    });
  });
});
