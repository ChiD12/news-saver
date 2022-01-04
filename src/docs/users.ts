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
    }
  }
};

export const usersParam = {
  '/users/{name}': {
    post: {
      tags: ['Users'],
      description: 'Create new user',
      operationId: 'create_user',
      parameters: [
        {
          name: 'name',
          in: 'path',
          schema: {
            $ref: '#/components/schemas/name'
          },
          required: true,
          description: 'Name of user'
        }
      ],
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
