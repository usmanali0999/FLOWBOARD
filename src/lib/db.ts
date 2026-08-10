// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("../generated/prisma/client")

declare global {
  // eslint-disable-next-line no-var
  var prisma: InstanceType<typeof PrismaClient> | undefined
}

export const db =
  globalThis.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db
}