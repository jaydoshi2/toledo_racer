import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Step3() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Step 3: Define reward function</h1>
      <p className="mb-4">This is the Step 3 page content.</p>
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/create_model/step2">Previous: Choose race type</Link>
        </Button>
        <Button asChild>
          <Link href="/create_model/step4">Next: Choose vehicle</Link>
        </Button>
      </div>
    </div>
  )
}
