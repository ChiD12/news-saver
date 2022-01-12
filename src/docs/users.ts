export const users = {
  '/users': {
    get: {
      tags: ['Users'], // operation's tag.
      description: 'Get all users', // operation's desc.
      operationId: 'get_users', // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: 'Todos were obtained', // response desc.
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Users'],
      description: 'Create new user',
      operationId: 'create_user',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/userInput'
            }
          }
        }
      },
      responses: {
        204: {
          description: 'User successfuly created'
        },
        404: {
          description: 'Todo not found'
        },
        500: {
          description: 'Server error'
        }
      }
    }
  }
};
