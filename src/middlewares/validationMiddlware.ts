import { validate, ValidationError } from 'class-validator';
import HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';

const convertString = (data: any): string => {
  const keys = Object.keys(data);
  return keys.reduce((res, key) => `${res}${res ? ', ' : ''}${data[key]}`, '');
};

const getErrorMessage = (data: any, nowKey: string): string => {
  try {
    if (!(data instanceof Array) && !(data instanceof Object)) return '';
    const keys = Object.keys(data);
    if (!keys.length) return '';
    if (nowKey === 'constraints') return convertString(data);
    return keys.reduce((res, key) => {
      const errMsg = getErrorMessage(data[key], key);
      if (errMsg) return `${res}${res ? ', ' : ''}${errMsg}`;
      else return res;
    }, '');
  } catch (e) {
    console.log(e);
  }
};

export const validationBodyMiddleware = (type: any, options = { skipMissingProperties: false }): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const bodyData = plainToInstance(type, req.body);
    req.body = bodyData;
    validate(bodyData, options)
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          return res.status(HttpStatus.BAD_REQUEST).send(
            {
              errors: {
                status: HttpStatus.BAD_REQUEST,
                code: 'INVALID_REQUEST_BODY',
                message: getErrorMessage(errors, ''),
              }
            }
          );
        } else {
          next();
        }
      });
  };
};

export const validationQueryMiddleware = (type: any, skipMissingProperties = false): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const queryData: any = plainToInstance(type, req.query);
    validate(queryData, { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          return res.status(400).send(
            {
              errors: {
                status: 400,
                code: 'INVALID_REQUEST_QUERY',
                message: getErrorMessage(errors, ''),
              }
            }
          );
        } else next();
      });
  };
};
