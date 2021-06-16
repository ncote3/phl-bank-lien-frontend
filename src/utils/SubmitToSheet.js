import axios from "axios";

const SubmitToSheet = async (dataToSubmit) => {
  axios({
    method: "post",
    url: "https://v1.nocodeapi.com/ncote3/google_sheets/JghLASWbOCAqSseH?tabId=Sheet1",
    params: {},
    data: [dataToSubmit],
  }).catch(function (error) {
    console.log(error);
  });
};

export default SubmitToSheet;
