import Router from '../utils/router.js';
import UserController from '../controllers/user.controller.js';

const router = new Router();

router.get('/api/user', UserController.getUsers);
router.get('/api/user/:id', UserController.getUser);
router.post('/api/user', UserController.createUser);
router.put('/api/user/:id', UserController.updateUser);
router.delete('/api/user/:id', UserController.deleteUser);

export default router;