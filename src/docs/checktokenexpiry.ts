export const checktokenexpiry = {
  '/checktokenexpiry': {
    post: {
      tags: ['Check Token Expiration'],
      description: 'Create new user',
      operationId: 'create_user',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Token'
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
