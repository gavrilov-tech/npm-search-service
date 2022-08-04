import express from 'express';

import { repositories } from './api';

export const router = express.Router();
router.get('/api/repository', repositories);
