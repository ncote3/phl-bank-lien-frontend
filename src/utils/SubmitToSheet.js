import axios from "axios";

const SubmitToSheet = async (dataToSubmit) => {
  let success = false;

  await axios
    .post(
      "https://v1.nocodeapi.com/ncote3/google_sheets/JghLASWbOCAqSseH?tabId=Sheet1",
      [dataToSubmit]
    )
    .then(() => {
      success = true;
    })
    .catch((error) => {
      console.log(error);
    });

  return success;
};

export default SubmitToSheet;
