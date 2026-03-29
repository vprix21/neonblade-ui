import Image from "next/image";
import {BlurText} from "@repo/registry/components/blur-text/BlurText";
import {RedText} from "@repo/registry/components/red-text/RedText";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <BlurText/>
      <RedText/>
    </main>
  )
    
}
