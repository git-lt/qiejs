/* eslint-disable */
const CountDown = require('../lib/CountDown').default;

const counter = new CountDown({
  time: 1588942491566,
  onFinish: () => {
    console.log('finish');
  },
  onChange: (r, d) => {
    console.log(r);
  },
});

// describe('倒计时测试', () => {
//   test('logger.info', () => {
//     const counter = new CountDown({
//       time: 1588942491566,
//       onFinish: () => {
//         console.log('finish');
//       },
//       onChange: (r, d) => {
//         console.log(r);
//       },
//     });
//     expect(counter.isCounting).toBe(true);
//   });
// });
