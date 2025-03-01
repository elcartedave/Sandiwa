import { User } from "@/models/user";

export const POST = async (req, res) => {
  try {
    const requested: User = await req.json();
    console.log(`Added user: ${JSON.stringify(requested)}!`);
    return new Response(JSON.stringify(requested), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message }), {
      status: 500,
    });
  }
};
