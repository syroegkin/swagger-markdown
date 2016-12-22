const anchor = require('../../app/lib/anchor');

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
    '| id | long |  |  |',
    '| name | string |  |  |'
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
          description: 'pet category in the store'
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
    '| category | [Category](#category) |  |  |',
    '| name | string | pet category in the store | Yes |',
    '| photoUrls | [ string ] |  | Yes |',
    '| tags | [ [Category](#category) ] |  |  |'
  ]
};
fixture.defHeader1 = `<a name="${anchor('Tag')}"></a>**Tag**  `;
fixture.defHeader2 = `<a name="${anchor('Pet')}"></a>**Pet**  `;

module.exports = fixture;
