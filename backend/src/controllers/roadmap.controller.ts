import { NextFunction, Request, Response } from "express";
import { generateRoadmap } from "../services/roadmap.service";

export async function submitQuestionnaire(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await generateRoadmap(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
