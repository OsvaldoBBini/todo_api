import { Router } from 'express';
import { AuthController } from './controller/AuthController';

export const router = Router();

router.post('/signin', new AuthController().signup);
