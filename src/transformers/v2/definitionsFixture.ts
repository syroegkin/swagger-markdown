export const fixture = {
  definitionsHeader: [
    '### Models',
  ],
  tableHeader: [
    '| Name | Type | Description | Required |',
    '| ---- | ---- | ----------- | -------- |',
  ],
  data1: {
    Tag: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        name: {
          type: 'string',
        },
      },
    },
  },
  result1: [
    '| id | long |  | No |',
    '| name | string |  | No |',
  ],
  data2: {
    Pet: {
      type: 'object',
      required: ['name', 'photoUrls'],
      properties: {
        category: {
          $ref: '#/definitions/Category',
        },
        name: {
          type: 'string',
          example: 'doggie',
          description: 'pet category in the store',
        },
        photoUrls: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        tags: {
          type: 'array',
          items: {
            $ref: '#/definitions/Category',
          },
        },
        gender: {
          type: 'string',
          enum: ['male', 'female'],
        },
      },
    },
  },
  result2: [
    '| category | [Category](#category-model) |  | No |',
    '| name | string | pet category in the store<br>*Example:* `"doggie"` | Yes |',
    '| photoUrls | [ string ] |  | Yes |',
    '| tags | [ [Category](#category-model) ] |  | No |',
    '| gender | string | *Enum:* `"male"`, `"female"` | No |',
  ],
  data3: {
    deviceid: {
      type: 'integer',
      format: 'int32',
      description: 'DeviceID',
    },
  },
  result3: [
    '| deviceid | integer | DeviceID |  |',
  ],
  data4: {
    Pet: {
      description: 'This\nis\na\nvery\nlong\ndescription',
      type: 'string',
    },
  },
  result4: [
    '| Pet | string | This is a very long description |  |',
  ],
  data5: {
    PetList: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          name: {
            type: 'string',
          },
          species: {
            type: 'string',
          },
          age: {
            type: 'integer',
          },
        },
      },
    },
  },
  result5: [
    '| PetList | [ { **"id"**: long, **"name"**: string, **"species"**: string, **"age"**: integer } ] |  |  |',
  ],
  data6: {
    TagList: {
      type: 'array',
      items: {
        $ref: '#/definitions/Tag',
      },
      description: 'A list of tags',
    },
  },
  result6: [
    '| TagList | [ [Tag](#tag-model) ] | A list of tags |  |',
  ],
  defHeader1: '#### Tag Model',
  defHeader2: '#### Pet Model',
  defHeader3: '#### deviceid Model',
  defHeader5: '#### PetList Model',
  defHeader6: '#### TagList Model',
};
// fixture.defHeader1 = '#### Tag';
// fixture.defHeader2 = '#### Pet';
// fixture.defHeader3 = '#### deviceid';
