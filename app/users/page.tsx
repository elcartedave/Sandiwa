/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useAuth } from "@/context/AuthContext";
import NotFound from "../not-found";
import LoadingPage from "@/components/Loading";
import { Grid, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Person } from "@/models/user";
import Usercard from "@/components/UserCard";

export default function UsersPage() {
  const { user, loading } = useAuth();
  const [lupon, setLupon] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [batch, setBatch] = useState<string>("");
  const [edukResidents, setEdukResidents] = useState<Person[]>([]);
  const [memResidents, setMemResidents] = useState<Person[]>([]);
  const [finResidents, setFinResidents] = useState<Person[]>([]);
  const [pubResidents, setPubResidents] = useState<Person[]>([]);
  const [exteResidents, setExteResidents] = useState<Person[]>([]);
  const [dataReady, setDataReady] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setEdukResidents(
      data.filter(
        (user: Person) => user.lupon == "Lupon ng Edukasyon at Pananaliksik"
      )
    );
    setMemResidents(
      data.filter((user: Person) => user.lupon == "Lupon ng Kasapian")
    );
    setFinResidents(
      data.filter((user: Person) => user.lupon == "Lupon ng Pananalapi")
    );
    setPubResidents(
      data.filter(
        (user: Person) => user.lupon == "Lupon ng Pamamahayag at Publikasyon"
      )
    );
    setExteResidents(
      data.filter((user: Person) => user.lupon == "Lupon ng Ugnayang Panlabas")
    );
    setTimeout(() => {
      setDataReady(true);
    }, 100);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleQuery = async (e) => {
    e.preventDefault();
  };
  if (loading || !dataReady) return <LoadingPage />;
  if (!user) return <NotFound />;
  return (
    <div>
      <Stack direction={"row"}>
        <TextField
          label="Filter By Lupon"
          onChange={(e) => {
            setLupon(e.target.value);
          }}
        />
        <TextField
          label="Filter By Position"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <TextField
          label="Filter By Age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <TextField
          label="Filter By Batch"
          onChange={(e) => {
            setBatch(e.target.value);
          }}
        />

        <Button onClick={handleQuery}>Done Filtering</Button>
      </Stack>
      <div className="p-5">
        <div className="pb-5 text-center">
          <h1 className="text-black font-semibold">Lupon ng Pananalapi</h1>
        </div>
        <Grid container spacing={2}>
          {finResidents.map((user: Person, index) => (
            <Grid item xs={6} sm={5} md={4} lg={3} key={index}>
              <Usercard user={user} />
            </Grid>
          ))}
        </Grid>
        <div className=" pt-7 pb-5 text-center">
          <h1 className="text-black font-semibold">
            Lupon ng Edukasyon at Pananaliksik
          </h1>
        </div>
        <Grid container spacing={2}>
          {edukResidents.map((user: Person, index) => (
            <Grid item xs={6} sm={5} md={4} lg={3} key={index}>
              <Usercard user={user} />
            </Grid>
          ))}
        </Grid>
        <div className=" pt-7 pb-5 text-center">
          <h1 className="text-black font-semibold">Lupon ng Kasapian</h1>
        </div>
        <Grid container spacing={2}>
          {memResidents.map((user: Person, index) => (
            <Grid item xs={6} sm={5} md={4} lg={3} key={index}>
              <Usercard user={user} />
            </Grid>
          ))}
        </Grid>
        <div className=" pt-7 pb-5 text-center">
          <h1 className="text-black font-semibold">
            Lupon ng Pamamahayag at Publikasyon
          </h1>
        </div>
        <Grid container spacing={2}>
          {pubResidents.map((user: Person, index) => (
            <Grid item xs={6} sm={5} md={4} lg={3} key={index}>
              <Usercard user={user} />
            </Grid>
          ))}
        </Grid>
        <div className=" pt-7 pb-5 text-center">
          <h1 className="text-black font-semibold">
            Lupon ng Ugnayang Panlabas
          </h1>
        </div>
        <Grid container spacing={2}>
          {exteResidents.map((user: Person, index) => (
            <Grid item xs={6} sm={5} md={4} lg={3} key={index}>
              <Usercard user={user} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
