import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, getServerSession } from '@roq/nextjs';
import { roqClient } from 'server/roq';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { entity, entityId, fileId, oldFileId } = req.body;
    const session = getServerSession(req, res);
    try {
      if (oldFileId) {
        await roqClient.asUser(session.roqUserId).deleteFileAssociations({
          filter: {
            fileId: {
              equalTo: oldFileId,
            },
          },
        });
      }
      const response = await roqClient.asUser(session.roqUserId).createFileAssociation({
        createFileAssociationDto: {
          fileId,
          entityName: entity,
          entityReference: entityId,
        },
      });
      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  } else if (req.method === 'DELETE') {
    const { fileId } = req.body;
    const session = getServerSession(req, res);
    try {
      const response = await roqClient.asUser(session.roqUserId).deleteFileAssociations({
        filter: {
          fileId: {
            equalTo: fileId,
          },
        },
      });
      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }

  res.status(405).send({ message: 'Method not allowed' });
  res.end();
}

export default function filesHandler(req: NextApiRequest, res: NextApiResponse) {
  return withAuth(req, res)(handler);
}
