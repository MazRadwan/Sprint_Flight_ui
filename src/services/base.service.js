import { toast } from "react-toastify"; // library for displaying notifications error message etc

export class BaseService {
  constructor() {
    this.handleError = this.handleError.bind(this);
  }

  async handleRequest(requestFn) {
    try {
      const result = await requestFn();
      if (!result.success) {
        throw new Error(result.error);
      }
      return { data: result.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    toast.error(errorMessage);
    throw error;
  }

  handleSuccess(message) {
    toast.success(message);
  }
}
