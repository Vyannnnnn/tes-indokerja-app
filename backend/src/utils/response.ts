import { Response } from 'express';

export const ok = (res: Response, data: any, message = 'Success') =>
  res.status(200).json({ success: true, message, data });

export const created = (res: Response, data: any, message = 'Created') =>
  res.status(201).json({ success: true, message, data });

export const fail = (res: Response, status: number, message: string, errors?: any) =>
  res.status(status).json({ success: false, message, errors });