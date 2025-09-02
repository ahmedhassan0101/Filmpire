import { Badge } from "@/components/ui/badge";

export default function MovieInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Movie Details</h1>
        <Badge variant="secondary">Demo Mode</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="aspect-[3/4] bg-muted rounded-lg animate-pulse" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 bg-muted rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
