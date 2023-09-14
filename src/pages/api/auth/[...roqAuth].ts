import { RoqAuth } from '@roq/nextjs';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { generateFakeDataUtil } from 'server/utils';

/*
    You can export RoqAuth without passing any options if you don't need to customize the behaviour
    export default RoqAuth; //handles all the authentication routes automatically
*/

export default RoqAuth({
  hooks: {
    // This hook is optional - and can be used to persist user information,
    // or as in the case below, send them a welcome notification

    onRegisterSuccess: async ({ user }) => {
      roqClient.asSuperAdmin().notify({
        notification: {
          key: 'welcome',
          recipients: { userIds: [user.id] },
        },
      });

      const owner = await prisma.user.create({
        data: {
          roq_user_id: user.id,
          tenant_id: user.tenantId,
          email: user.email,
        },
      });
      let mainEntityId;
      let seedNumber: number;
      if (user.roles.data.some((role) => ['Organisation Admin'].includes(role.name))) {
        const tenant = await roqClient.asSuperAdmin().tenant({ id: user.tenantId });
        const { name: tenantName } = tenant.tenant ?? {};
        seedNumber = await prisma.client.count();
        const mainEntity = await prisma.client.create({
          data: {
            tenant_id: user.tenantId,
            user_id: owner.id,
            name: tenantName,
          },
        });
        mainEntityId = mainEntity.id;
      }
      await generateFakeDataUtil(mainEntityId, user.tenantId, owner.id, seedNumber);
    },

    onLoginSuccess: async ({ user }) => {
      const existedUser = await prisma.user.findFirst({ where: { roq_user_id: user.id } });
      if (!existedUser) {
        const owner = await prisma.user.create({
          data: {
            roq_user_id: user.id,
            tenant_id: user.tenantId,
            email: user.email,
          },
        });
      }
    },
  },
});
