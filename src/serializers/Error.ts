import BaseSerializer from './Base';

class ErrorSerializer extends BaseSerializer {
  constructor(status, message: string) {
    super(status, null, message);
  }
}

export default ErrorSerializer;
