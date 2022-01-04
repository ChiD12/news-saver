export const components = {
  components: {
    schemas: {
      // id model
      name: {
        type: 'string', // data type
        description: 'Name of User', // desc
        example: 'Daniel' // example of an id
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User Id',
            example: '61d0d0e41ab6fb418ce82f5e'
          },
          name: {
            $ref: '#/components/schemas/name'
          }
        }
      },
      TodoInput: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: "Todo's title",
            example: 'Coding in JavaScript'
          },
          completed: {
            type: 'boolean',
            description: 'The status of the todo',
            example: false
          }
        }
      },
      // error model
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string', // data type
            description: 'Error message', // desc
            example: 'Not found' // example of an error message
          },
          internal_code: {
            type: 'string', // data type
            description: 'Error internal code', // desc
            example: 'Invalid parameters' // example of an error internal code
          }
        }
      }
    }
  }
};
