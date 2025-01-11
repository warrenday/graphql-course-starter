import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import JobBoard from "./JobBoard";
import { render } from "../../test-utils";
import { createMockServer } from "../../test-utils/mockServer";

const mockServer = createMockServer();

describe("JobBoard", () => {
  beforeAll(() => mockServer.listen());
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());

  it("shows the job title in the job card", async () => {
    mockServer.addMocks({
      Query: {
        searchJobs: () => {
          return [{ id: "1", title: "Software Engineer" }];
        },
      },
    });

    render(<JobBoard />);

    await waitFor(() => {
      expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    });
  });

  it("applies for a job", async () => {
    const applyForJobMock = jest.fn();

    mockServer.addMocks({
      Query: {
        searchJobs: () => {
          return [{ id: "1", title: "Software Engineer", isApplied: false }];
        },
      },
      Mutation: {
        applyForJob: (args) => {
          applyForJobMock(args);
          return true;
        },
      },
    });

    render(<JobBoard />);

    await waitFor(() => {
      expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    });

    // Click the apply button in the job card
    const applyButton = await screen.findByText("Apply");
    fireEvent.click(applyButton);

    // Click the apply button in the modal
    const dialog = await screen.findByRole("dialog");
    const applyButtonInModal = within(dialog).getByText("Apply");
    fireEvent.click(applyButtonInModal);

    await waitFor(() => {
      expect(applyForJobMock).toHaveBeenCalledWith({
        input: {
          id: "1",
        },
      });
    });

    await waitFor(() => {
      expect(screen.getByText("Awaiting response")).toBeInTheDocument();
    });
  });
});
