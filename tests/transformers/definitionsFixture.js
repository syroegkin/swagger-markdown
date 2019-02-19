const fixture = {
  definitionsHeader: [
    '### Models'
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
    '| category | [Category](#category) |  | No |',
    '| name | string | pet category in the store | Yes |',
    '| photoUrls | [ string ] |  | Yes |',
    '| tags | [ [Category](#category) ] |  | No |'
  ],
  data3: {
    deviceid: {
      type: 'integer',
      format: 'int32',
      description: 'DeviceID'
    }
  },
  result3: [
    '| deviceid | integer | DeviceID |  |'
  ]
};
fixture.defHeader1 = '#### Tag';
fixture.defHeader2 = '#### Pet';
fixture.defHeader3 = '#### deviceid';

module.exports = fixture;
