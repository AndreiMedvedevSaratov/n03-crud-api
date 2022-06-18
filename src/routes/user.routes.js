import Router from '../utils/router.js';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = new Router();

router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.post('/user', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;