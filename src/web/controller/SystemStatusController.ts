import { Request, Response } from "express";
import { prisma } from "lib/prisma";

export class SystemStatusController {
  async create(req: Request, res: Response) {
    const { batteryLevel, connectionLevel, currentActivity, currentSector } = req.body;

    try {
      const systemStatus = await prisma.systemStatus.create({
        data: { batteryLevel, connectionLevel, currentActivity, currentSector }
      });

      return res.status(201).json({ ok: true });
    } catch (error) {
      console.error("Error creating system status:", error);
      return res.status(500).json({ error: "Erro ao registrar status do sistema." });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const statusList = await prisma.systemStatus.findMany({
        orderBy: { timestamp: "desc" },
        take: 50
      });

      return res.json(statusList);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar status do sistema." });
    }
  }
}
