const fs = require('fs');
const readline = require('readline');
const showdown = require('showdown');

//例子1
// fs.readFile('hello.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

//例子2
// const fileList = ['hello.txt', 'hello2.txt', 'hello3.txt'];

// fileList.forEach((file) => {
//   const rl = readline.createInterface({
//     input: fs.createReadStream(file),
//     output: process.stdout,
//     terminal: false,
//   });

//   rl.on('line', (line) => {
//     console.log(line);
//   });

//   rl.on('close', () => {
//     console.log(`${file} END`);
//   });
// });

//例子3
// const fileList = ['hello.txt', 'hello2.txt', 'hello3.txt'];
// let step = 0;
// const readFile = () => {
//   const rl = readline.createInterface({
//     input: fs.createReadStream(fileList[step]),
//     output: process.stdout,
//     terminal: false,
//   });

//   rl.on('line', (line) => {
//     console.log(line);
//   });

//   rl.on('close', () => {
//     if (step === fileList.length - 1) {
//       console.log(`END`);
//     } else {
//       step++;
//       readFile();
//     }
//   });
// };
// readFile();

//例子4
// const fileList = ['hello.txt', 'hello2.txt', 'hello3.txt'];

// const readFile = (file) => {
//   return new Promise((resolve, reject) => {
//     let category = '';

//     const rl = readline.createInterface({
//       input: fs.createReadStream(file),
//       output: process.stdout,
//       terminal: false,
//     });

//     rl.on('line', (line) => {
//       if (line.includes('#') && !line.includes('##')) {
//         category = line;
//       }
//       console.log(line);
//     });

//     rl.on('close', () => resolve(category));
//     rl.on('error', (err) => reject(err));
//   });
// };

// Promise.all(
//   fileList.map((file) => {
//     return readFile(file);
//   })
// ).then((result) => {
//   console.log('End');
//   console.log('-------');
//   console.log(result);
// });

//例子5 用 Promise Promise.All 控制
// const fileList = ['hello.txt', 'hello2.txt', 'hello3.txt'];

// const readFile = (file) => {
//   return new Promise((resolve, reject) => {
//     let isRecording = false;
//     let currentStep = 0;
//     const result = {
//       category: '',
//       qaList: [],
//     };

//     const rl = readline.createInterface({
//       input: fs.createReadStream(file),
//       output: process.stdout,
//       terminal: false,
//     });

//     rl.on('line', (line) => {
//       if (line.includes('#') && !line.includes('##')) {
//         result.category = line;
//       } else if (line.includes('##') && isRecording === false) {
//         isRecording = true;
//         result.qaList.push({
//           question: line,
//           answer: '',
//         });
//       } else if (line.includes('##') && isRecording === true) {
//         currentStep = currentStep + 1;
//         result.qaList.push({
//           question: line,
//           answer: '',
//         });
//       } else if (isRecording === true) {
//         result.qaList[currentStep].answer = result.qaList[currentStep].answer
//           ? result.qaList[currentStep].answer + '\n' + line
//           : line;
//       }
//     });

//     rl.on('close', () => resolve(result));
//     rl.on('error', (err) => reject(err));
//   });
// };

// Promise.all(
//   fileList.map((file) => {
//     return readFile(file);
//   })
// ).then((result) => {
//   console.log(JSON.stringify(result));
//   console.log('End');
// });

// 例子6 加入 showdown 轉換
// const fileList = ['hello.txt', 'hello2.txt', 'hello3.txt'];

// const readFile = (file) => {
//   return new Promise((resolve, reject) => {
//     let isRecording = false;
//     let currentStep = 0;
//     const result = {
//       category: '',
//       qaList: [],
//     };

//     const rl = readline.createInterface({
//       input: fs.createReadStream(file),
//       output: process.stdout,
//       terminal: false,
//     });

//     rl.on('line', (line) => {
//       if (line.includes('#') && !line.includes('##')) {
//         result.category = line;
//       } else if (line.includes('##') && isRecording === false) {
//         isRecording = true;
//         result.qaList.push({
//           question: line,
//           answer: '',
//         });
//       } else if (line.includes('##') && isRecording === true) {
//         currentStep = currentStep + 1;
//         result.qaList.push({
//           question: line,
//           answer: '',
//         });
//       } else if (isRecording === true) {
//         result.qaList[currentStep].answer = result.qaList[currentStep].answer
//           ? result.qaList[currentStep].answer + '\n' + line
//           : line;
//       }
//     });

//     rl.on('close', () => {
//       let converter = new showdown.Converter();
//       result.qaList = result.qaList.map((element) => {
//         return {
//           question: element.question,
//           answer: converter.makeHtml(element.answer),
//         };
//       });
//       return resolve(result);
//     });
//     rl.on('error', (err) => reject(err));
//   });
// };

// Promise.all(
//   fileList.map((file) => {
//     return readFile(file);
//   })
// ).then((result) => {
//   console.log(JSON.stringify(result));
//   console.log('End');
// });

//例子7 寫入檔案
const fileList = ['hello.txt', 'hello2.txt', 'hello3.txt'];

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    let isRecording = false;
    let currentStep = 0;
    const result = {
      category: '',
      qaList: [],
    };

    const rl = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false,
    });

    rl.on('line', (line) => {
      if (line.includes('#') && !line.includes('##')) {
        result.category = line;
      } else if (line.includes('##') && isRecording === false) {
        isRecording = true;
        result.qaList.push({
          question: line,
          answer: '',
        });
      } else if (line.includes('##') && isRecording === true) {
        currentStep = currentStep + 1;
        result.qaList.push({
          question: line,
          answer: '',
        });
      } else if (isRecording === true) {
        result.qaList[currentStep].answer = result.qaList[currentStep].answer
          ? result.qaList[currentStep].answer + '\n' + line
          : line;
      }
    });

    rl.on('close', () => {
      let converter = new showdown.Converter();
      result.qaList = result.qaList.map((element) => {
        return {
          question: element.question,
          answer: converter.makeHtml(element.answer),
        };
      });
      return resolve(result);
    });
    rl.on('error', (err) => reject(err));
  });
};

Promise.all(
  fileList.map((file) => {
    return readFile(file);
  })
).then((result) => {
  console.log('End');
  fs.writeFile('qa.json', JSON.stringify(result), (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
});
