import Todo from "@client/models/Todo";

namespace BackEndRouter {
  enum BASE_URL {
    PRODUCTION = "https://bootstrap-todo-demo.herokuapp.com",
    DEVELOPMENT = "/api",
  }

  export const getBaseUrl = () => {
    switch (process.env.NODE_ENV) {
      case "production":
        return BASE_URL.PRODUCTION;
      case "development":
        return BASE_URL.DEVELOPMENT;
      default:
        return BASE_URL.DEVELOPMENT;
    }
  };

  export namespace TodoRouter {
    const BASE_URL = `${getBaseUrl()}/todos`;

    const validateResponse = (response: Response) => {
      if (response.status !== 200) throw new Error("request failed");
      return response.json();
    };

    const list = (): Promise<Todo[]> => {
      return fetch(BASE_URL).then(validateResponse);
    };

    const create = (body: Todo): Promise<Todo> => {
      return fetch(BASE_URL, {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(body),
      }).then(validateResponse);
    };
    const read = (id: number) => {};

    const update = (id: number, body: Todo): Promise<Todo> => {
      return fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(body),
      }).then(validateResponse);
    };

    const remove = (id: number): Promise<Todo> => {
      return fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      }).then(validateResponse);
    };

    export const EndPoints = {
      LIST: list,
      CREATE: create,
      READ: read,
      UPDATE: update,
      DELETE: remove,
    };
  }
}

export default BackEndRouter;
