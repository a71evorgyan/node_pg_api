import '../env';
import { App } from './app';
import { ArticleController } from './resources/article/article.controller';
import { CategoryController } from './resources/category/category.controller';
import { UserController } from './resources/user/user.controller';
import { PORT, URI } from './utils';

const app = new App(Number(PORT), URI, [new UserController(), new CategoryController(), new ArticleController()]);

app.listen();
