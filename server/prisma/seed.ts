import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  const user = await prisma.user.create({
    data: {
      name: 'Dárcio Carvalho',
      email: 'darcio.nuno@gmail.com',
      avatarUrl: 'https://github.com/DarcioCarvalho.png'
    }
  })

  const poll = await prisma.poll.create({
    data: {
      title: 'Exemplo Poll',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-10T18:00:00.517Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-11T08:00:00.517Z',
      firstTeamCountryCode: 'PT',
      secondTeamCountryCode: 'JP',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id
              }
            }
          }
        }
      }
    }
  })

}

main()