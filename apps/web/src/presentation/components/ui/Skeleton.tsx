import type { HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  /** Apply shimmer animation. Default true. */
  shimmer?: boolean;
};

const Skeleton = ({ className = "", shimmer = true, ...props }: SkeletonProps): JSX.Element => {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`rounded-lg bg-[color:var(--surface2)] ${shimmer ? "skeleton-shimmer" : ""} ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
