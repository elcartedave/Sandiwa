import { getUser, db } from "@/lib/firestore";
export async function GET(_req: Request, { params }) {
  try {
    const { userId } = await params;
    // alert(userId);
    const user = await getUser(db, userId);
    if (user) {
      return new Response(JSON.stringify(user), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ message: "No user" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
