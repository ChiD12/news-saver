export const components = {
  components: {
    schemas: {
      // id model
      name: {
        type: 'string',
        description: 'Name of User',
        example: 'Daniel'
      },
      password: {
        type: 'string',
        description: 'password',
        example: 'password'
      },
      email: {
        type: 'string',
        description: 'email associated with the account',
        example: 'email@gmail.com'
      },
      deviceType: {
        type: 'string',
        description: 'type of device, either andorid or browser',
        example: 'android'
      },
      deviceId: {
        type: 'string',
        description: 'External device id',
        example: '123'
      },
      token: {
        type: 'string',
        description: 'jwt token',
        example:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGFuaWVsIiwidXNlcklkIjoiNjFkN2M4MzNhMjQ1YzA1NWI2ZjYzYTk3IiwiZGV2aWNlVHlwZSI6ImFuZHJvaWQiLCJleHRlcm5hbERldmljZUlkIjoiMTIzIiwiaWF0IjoxNjQyNTU2NjQ1LCJleHAiOjE2NDI1NTY3MDV9.90iVdH3S_TNgtGZjR-ALHORralodEE1UO70ZZoooVMU'
      },
      Token: {
        type: 'object',
        properties: {
          token: {
            $ref: '#/components/schemas/token'
          }
        }
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
      userInput: {
        type: 'object',
        properties: {
          name: {
            $ref: '#/components/schemas/name'
          },
          password: {
            $ref: '#/components/schemas/password'
          }
        }
      },
      loginInput: {
        type: 'object',
        properties: {
          name: {
            $ref: '#/components/schemas/name'
          },
          password: {
            $ref: '#/components/schemas/password'
          },
          deviceType: {
            $ref: '#/components/schemas/deviceType'
          },
          deviceId: {
            $ref: '#/components/schemas/deviceId'
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
