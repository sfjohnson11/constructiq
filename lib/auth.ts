export async function loginInstructor({ email, password }: { email: string; password: string }) {
  return { success: email === "instructor@test.com" && password === "password123" }
}

export async function loginAdmin({ email, password }: { email: string; password: string }) {
  return { success: email === "admin@test.com" && password === "adminpass" }
}
