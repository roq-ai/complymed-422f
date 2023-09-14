import { roqClient } from 'server/roq';

export class NotificationService {
  static async sendNotificationToRoles(key: string, roles: string[], userId: string, tenantId: string) {
    const { users } = await roqClient
      .asSuperAdmin()
      .users({ filter: { roleKey: { valueIn: roles }, tenantId: { equalTo: tenantId } } });

    if (users.totalCount > 0) {
      return roqClient.asSuperAdmin().notify({
        notification: {
          key,
          recipients: { userIds: users.data.map((e) => e.id).filter((id) => id !== userId) },
        },
      });
    }
  }

  static async sendNotificationToUser(key: string, userId: string) {
    return roqClient.asSuperAdmin().notify({
      notification: {
        key,
        recipients: { userIds: [userId] },
      },
    });
  }

  static async sendToAllExceptUser(key: string, userId: string, tenantId: string) {
    return roqClient.asSuperAdmin().notify({
      notification: {
        key,
        recipients: { allUsers: true, excludedUserIds: [userId], tenantIds: [tenantId] },
      },
    });
  }
}
