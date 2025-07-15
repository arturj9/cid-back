import { Request, Response } from "express";
import { prisma } from "lib/prisma";

export class MeasurementController {
  async create(req: Request, res: Response) {
    const { temperature, humidity, soilMoisture, luminosity, errors } = req.body;

    try {
      const measurement = await prisma.measurement.create({
        data: { temperature, humidity, soilMoisture, luminosity, errors }
      });

      return res.status(201).json({ ok: true });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao registrar medição." });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const measurements = await prisma.measurement.findMany({
        orderBy: { timestamp: "desc" },
        take: 50
      });

      return res.json(measurements);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar medições." });
    }
  }
}
