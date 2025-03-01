import { getAllUsers, db } from "../../../lib/firestore";
// export const GET = (req) => {
//   const users: User[] = userList;
//   try {
//     return new Response(JSON.stringify(users), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: Request) => {
  try {
    const users = await getAllUsers(db);
    // console.log(`Users: ${JSON.stringify(users)}`);
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
