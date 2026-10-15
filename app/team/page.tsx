import Image from "next/image";
import OrbitShowcase from "@/components/orbit/OrbitShowcase";
import { orbitActions, team } from "@/components/orbit/team";

export default function TeamPage() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-x-hidden bg-white px-4 py-16 sm:px-8">
      <OrbitShowcase
        members={team}
        actions={orbitActions}
        outerDuration={60}
        innerDuration={40}
        center={
          <Image src="/ewa-logo.png" alt="EWA" width={344} height={306} priority className="h-auto w-full" />
        }
      />
    </main>
  );
}
