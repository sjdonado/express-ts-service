class BaseSerializer {
  private status: number;

  private data: Object;

  private error: string;

  constructor(status: number, data, error: string = null) {
    this.status = status;
    this.data = data;
    this.error = error;
  }

  toJSON() {
    return {
      status: this.status,
      data: this.data,
      ...this.error && { error: this.error },
    };
  }
}

export default BaseSerializer;
