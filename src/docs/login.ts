export const logins = {
  '/login': {
    post: {
      tags: ['Login'], // operation's tag.
      description: 'login', // operation's desc.
      operationId: 'login', // unique operation id.
      parameters: [], // expected params.
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/loginInput'
            }
          }
        }
      },
      // expected responses
      responses: {
        // response code
        200: {
          description: 'Todos were obtained',
          content: 'hi'
        }
      }
    }
  }
};
