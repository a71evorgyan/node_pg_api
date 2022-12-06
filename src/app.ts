import express, { Application, json, urlencoded } from 'express';
import path from 'path';
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

    this.initializeDatabaseConnection();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.express.use(cors());
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
    this.express.use(express.static(path.join(__dirname, '../uploads')));
  }

  private initializeDatabaseConnection(): void {
    setupDb();
  }

  private initializeControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
      this.express.use('/api', controller.router);
    });
  }

  private initializeErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server is running at ${this.uri}`);
    });
  }
}
