import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";
interface ICreateClient {
  username: string;
  password: string;
}

class CreateClientUseCase {
  async execute({ password, username }: ICreateClient) {
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          mode: "insensitive",
        },
      },
    });
    if (clientExist) {
      throw new Error(`Client ${username} already exists`);
    }

    const hasPassword = await hash(password, 10);
    const client = await prisma.clients.create({
      data: {
        username,
        password: hasPassword,
      },
    });

    return client;
  }
}

export { CreateClientUseCase };
