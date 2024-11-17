import { Skeleton } from "@/components/ui/skeleton";

function LoadingSekeleton() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-52 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSekeleton;
