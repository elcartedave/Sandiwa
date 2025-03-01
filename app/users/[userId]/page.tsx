import { Person } from "@/models/user";
import { Box } from "@mui/material";

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;
  // console.log(userId);
  const response = await fetch(`${process.env.BASE_URL}/api/users/${userId}`);
  if (!response.ok) {
    console.error(`Error: ${response.status}`);
    return <h1 className="text-red-500">Error loading user data</h1>;
  }

  const user = (await response.json()) as Person;
  // alert(userData);
  return (
    <div>
      <Box component={"img"} src={user.photoUrl || undefined} />
      <h1 className="text-black">{user.name}</h1>;
      <h1 className="text-black">{user.nickname}</h1>;
      <h1 className="text-black">{user.age}</h1>;
      <h1 className="text-black">{user.homeAddress}</h1>;
      <h1 className="text-black">{user.collegeAddress}</h1>;
      <h1 className="text-black">{user.contactno}</h1>;
      <h1 className="text-black">{user.batch}</h1>;
      <h1 className="text-black">{user.degprog}</h1>;
      <h1 className="text-black">{user.birthday}</h1>;
      <h1 className="text-black">{user.position}</h1>;
      <h1 className="text-black">{user.lupon}</h1>;
      <h1 className="text-black">{user.sponsor}</h1>;
    </div>
  );
}
