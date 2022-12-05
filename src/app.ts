import express, { Application, json, urlencoded } from 'express';
import cors from 'cors';
import { setupDb } from './db/db-setup';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { IController } from './types';

export class App {
  public express: Application;
  public port: number;
  public uri: string;

  constructor(port: number, uri: string, controllers: IController[]) {
    this.express = express();
    this.port = port;
    this.uri = uri;

    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
  }

  private initialiseMiddleware(): void {
    this.express.use(cors());
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
  }

  private initialiseDatabaseConnection(): void {
    setupDb();
  }

  private initialiseControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
      this.express.use('/api', controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server is running at ${this.uri}`);
    });
  }
}
