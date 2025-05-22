import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Step2() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Step 2: Choose race type and training algorithm</h1>
      <p className="mb-4">This is the Step 2 page content.</p>
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/create_model/step1">Previous: Specify model name</Link>
        </Button>
        <Button asChild>
          <Link href="/create_model/step3">Next: Define reward function</Link>
        </Button>
      </div>
    </div>
  )
}
