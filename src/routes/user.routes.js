import Router from '../utils/router.js';
import UserController from '../controllers/user.controller.js';

const router = new Router();

router.get('/user', UserController.getUsers);
router.get('/user/:id', UserController.getUser);
router.post('/user', UserController.createUser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

export default router;