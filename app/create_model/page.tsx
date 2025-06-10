import { redirect } from "next/navigation"

export default function CreateModel() {
  // Redirect to step1 when accessing /create_model directly
  // redirect("/create_model/step1")
  redirect("/username")

}
