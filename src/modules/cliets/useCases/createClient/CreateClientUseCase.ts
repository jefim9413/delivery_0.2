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
  }
}

export { CreateClientUseCase };
