import { Request, Response, NextFunction } from 'express';

import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

type RequestLocation = 'query' | 'body' | 'params';

export const validate = (location: RequestLocation, schema: OptionalObjectSchema<ObjectShape>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let _location: any;
    switch (location) {
      case 'query':
        _location = req.query;
        break;
      case 'body':
        _location = req.body;
        break;
      case 'params':
        _location = req.params;
        break;
    }
    _location = await schema.validate(_location);
    next();
  };
};
