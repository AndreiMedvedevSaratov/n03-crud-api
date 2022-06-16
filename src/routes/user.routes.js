import Router from '../utils/router';
import { getUsers, createUser } from '../controllers/user.controller';

const router = new Router();

router.get('/user', getUsers);
router.post('/user', createUser);
router.put('/user', () => { console.log('update some user'); });
router.delete('/user', () => { console.log('delete some user'); });

export default router;