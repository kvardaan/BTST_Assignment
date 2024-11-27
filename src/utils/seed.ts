import { hash } from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: "johndoe@example.com",
      password: await hash("johndoe", 12),
      name: "John Doe",
      tasks: {
        createMany: {
          data: [
            {
              title: "Task 1",
              description: "Description 1",
              status: true,
            },
            {
              title: "Task 2",
              description: "Description 2",
            },
            {
              title: "Task 3",
              description: "Description 3",
            },
            {
              title: "Task 4",
              description: "Description 4",
              status: true,
            },
          ],
        },
      },
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: "alicejane@example.com",
      password: await hash("alicejane", 12),
      name: "Alice Jane",
      tasks: {
        createMany: {
          data: [
            {
              title: "Task 5",
              description: "Description 5",
              status: true,
            },
            {
              title: "Task 6",
              description: "Description 6",
            },
          ],
        },
      },
    },
  })

  console.log(`Created users = ${user1?.name}, ${user2?.name}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma?.$disconnect()
  })
