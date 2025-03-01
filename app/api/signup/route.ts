import { User } from "@/models/user";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const POST = async (req: Request) => {
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
