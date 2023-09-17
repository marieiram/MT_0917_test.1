// Zero shot fine tuning gpt model

const axios = require("axios/dist/browser/axios.cjs"); // browser
const apikey = "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";

let res;
let message;
let button = document.getElementById("send");
let answer = document.getElementById("answer");

let send = async function () {
  let response = await axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      // '{\n  "model": "gpt-3.5-turbo",\n  "messages": [{"role": "user", "content": "What is the OpenAI mission?"}]\n}',
      {
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: "Bearer " + apikey,
          "Content-Type": "application/json"
        }
      }
    )
    .then(function (r) {
      // console.log(r.request.response);
      res = JSON.parse(r.request.response);
    });
};

button.onclick = function () {
  let structure =
    "Comment the following conversation as an exciting korean drama and then translate the comments into japanese: ";
  message = document.getElementById("message").value;
  let requests = "";

  message = structure + message;
  //send requests to chat gpt
  send().then(function () {
    console.log(message);
    // console.log(res.choices[0].message.content);
    answer.innerText = res.choices[0].message.content;
  });
};
