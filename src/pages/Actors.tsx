import { Badge } from "@/components/ui/badge";

export default function Actors() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Popular Actors</h1>
        <Badge variant="secondary">Demo Mode</Badge>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="space-y-2 text-center">
            <div className="aspect-square bg-muted rounded-full animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}