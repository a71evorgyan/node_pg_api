import '../env';
import { App } from './app';
import { UserController } from './resources/user/user.controller';
import { PORT, URI } from './utils';

const app = new App(Number(PORT), URI, [new UserController()]);

app.listen();
