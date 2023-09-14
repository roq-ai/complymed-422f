import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { clientValidationSchema } from 'validationSchema/clients';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getClients();
    case 'POST':
      return createClient();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getClients() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.client
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'client'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createClient() {
    await clientValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.audit_report?.length > 0) {
      const create_audit_report = body.audit_report;
      body.audit_report = {
        create: create_audit_report,
      };
    } else {
      delete body.audit_report;
    }
    if (body?.business?.length > 0) {
      const create_business = body.business;
      body.business = {
        create: create_business,
      };
    } else {
      delete body.business;
    }
    if (body?.progress?.length > 0) {
      const create_progress = body.progress;
      body.progress = {
        create: create_progress,
      };
    } else {
      delete body.progress;
    }
    if (body?.task?.length > 0) {
      const create_task = body.task;
      body.task = {
        create: create_task,
      };
    } else {
      delete body.task;
    }
    const data = await prisma.client.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
