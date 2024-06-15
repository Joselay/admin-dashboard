import Search from "@/components/Search";
import UsersTable from "@/components/UsersTable";
import { Title, Text, Card } from "@tremor/react";
import prisma from "@/lib/prisma";

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const query = searchParams.q;
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      email: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return (
    <main className="p-4 mx-auto md:p-10 max-w-7xl">
      <Title>Users</Title>
      <Text>A table of users retrieve from our database.</Text>
      <Search query={query} />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
