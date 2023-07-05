import { CountPolls } from '../../utils/CountPolls';


describe('PollResult', () => {

    const mockedData = [{
    "id": 1,
    "questionnaireId": 1,
    "userId": 2,
    "result": 9,
    "category": 1,
    "createdAt": new Date("2023-06-26T00:41:39.283Z")
  }];

  test('集計が正しく行われるか', async () => {
    const result=CountPolls(mockedData,1)
    expect(result).toEqual( { '9': 1 });
  });

});


