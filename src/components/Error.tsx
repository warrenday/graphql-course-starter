import { ZodError } from "zod";
import { Badge } from "./ui/badge";
import { ApolloError } from "@apollo/client";
import clsx from "clsx";

const formatInputErrors = (error: unknown) => {
  if (error instanceof ApolloError) {
    const inputError = error.graphQLErrors[0]?.extensions?.error;
    if (inputError) {
      const zodError = inputError as ZodError;
      return zodError.issues.map(
        (issue) => issue.path.join(".") + ": " + issue.message
      );
    }
  }
  return null;
};

interface IErrorProps {
  error: unknown;
  className?: string;
}

const Error = (props: IErrorProps) => {
  const { error, className } = props;
  const inputErrors = formatInputErrors(error);

  if (!inputErrors) {
    return null;
  }

  return (
    <div
      className={clsx(
        className,
        "flex flex-col gap-2 border-l-2 border-red-600 pl-4"
      )}
    >
      <p className="text-red-600 font-medium text-sm">
        Please fix the following {inputErrors?.length} errors:
      </p>
      {inputErrors.map((error) => (
        <Badge key={error} color="red">
          {error}
        </Badge>
      ))}
    </div>
  );
};

export default Error;
