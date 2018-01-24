const fixture = {
  definitionsHeader: [
    '### Models', '---'
  ],
  tableHeader: [
    '| Name | Type | Description | Required |',
    '| ---- | ---- | ----------- | -------- |'
  ],
  data1: {
    Tag: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64'
        },
        name: {
          type: 'string'
        }
      }
    }
  },
  result1: [
    '| id | long |  | No |',
    '| name | string |  | No |'
  ],
  data2: {
    Pet: {
      type: 'object',
      required: ['name', 'photoUrls'],
      properties: {
        category: {
          $ref: '#/definitions/Category'
        },
        name: {
          type: 'string',
          example: 'doggie',
          description: 'pet category in\nthe store'
        },
        photoUrls: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        tags: {
          type: 'array',
          items: {
            $ref: '#/definitions/Category'
          }
        }
      }
    }
  },
  result2: [
    '| category | [Category](#category) |  | No |',
    '| name | string | pet category in the store | Yes |',
    '| photoUrls | [ string ] |  | Yes |',
    '| tags | [ [Category](#category) ] |  | No |'
  ]
};
fixture.defHeader1 = '### Tag  ';
fixture.defHeader2 = '### Pet  ';

module.exports = fixture;
