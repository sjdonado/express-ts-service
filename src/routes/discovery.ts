import { Router } from 'express';

import DiscoveryController from '@controllers/discovery';

const router = Router();

router.get('/', DiscoveryController.fetch);

router.get('/ping', DiscoveryController.ping);

export default router;
