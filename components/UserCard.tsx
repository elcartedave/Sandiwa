"use client";
import { Person } from "@/models/user";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Usercard(props: { user: Person }) {
  const { user } = props;
  const route = useRouter();
  return (
    <div
      onClick={() => route.push(`/users/${user.id}`)}
      className=" cursor-pointer"
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{ height: { xs: 150, sm: 200, md: 250, lg: 300 } }}
          image={user.photoUrl || "/assets/default.jpg"}
        />
        <CardContent sx={{ overflow: "auto" }}>
          <Typography noWrap>Name: {user.name}</Typography>
          <Typography>Age: {user.age}</Typography>
          <Typography>Batch: {user.batch}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
