import { prisma } from 'server/db';
import seed from 'const/seed.json';
import { roqClient } from 'server/roq';
import { UserCreateDto } from '@roq/nodejs/dist/src/generated/sdk';

export async function generateFakeDataUtil(mainEntityId: string, tenantId: string, userId: string, count: number) {
  try {
    const data = !Number.isNaN(count) ? seed[count] : null;
    if (!data) {
      return;
    }
    const replacedData = JSON.stringify(data)
      .replaceAll('main_entity_pk', mainEntityId)
      .replaceAll('user_entity_pk', userId);
    const { roqUser, ...replacedObject } = JSON.parse(replacedData);
    const seedEntries = Object.entries(replacedObject);
    await Promise.all(roqUser.map((user: UserCreateDto) => seedFakeUser(user, tenantId)));
    for (const [model, values] of seedEntries) {
      // @ts-ignore
      await prisma[model].createMany({
        data: values,
      });
    }
  } catch (err) {
    console.log('unable to generate seed data: ', err);
  }
}

async function seedFakeUser(roqUser: UserCreateDto, tenantId: string) {
  const { createUser: user } = await roqClient.asSuperAdmin().createUser({
    user: {
      ...roqUser,
      tenantId,
    },
  });
  await prisma.user.create({
    data: {
      roq_user_id: user.id,
      tenant_id: user.tenantId,
      email: user.email,
    },
  });
}
