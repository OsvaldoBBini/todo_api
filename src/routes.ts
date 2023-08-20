import { Router } from 'express';
import { AuthController } from './controller/AuthController';

export const router = Router();

router.post('/signup', new AuthController().signup);
