
export const register = async (email: string, password: string, fullname:string ) => {
  const res = await fetch("http://localhost:5206/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, fullname }),
  });

    if (!res.ok) throw new Error("Registration failed");
  return await res.json();
};
