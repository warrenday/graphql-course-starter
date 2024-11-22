import { ReactNode } from "react";

interface IEmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const EmptyState = (props: IEmptyStateProps) => {
  const { title, description, icon, action } = props;

  return (
    <div className="text-center">
      <div className="rounded-lg border-2 border-dashed border-zinc-200 p-12 dark:border-zinc-800">
        <div className="flex flex-col items-center gap-3">
          {icon && (
            <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
              <div className="size-6 text-zinc-500 dark:text-zinc-400">
                {icon}
              </div>
            </div>
          )}
          <div className="text-zinc-500 dark:text-zinc-400">
            {title && <p className="font-medium">{title}</p>}
            {description && <p className="text-sm mt-1">{description}</p>}
          </div>
          {action && <div className="mt-3">{action}</div>}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
