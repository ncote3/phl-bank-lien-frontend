const GetDate = (): string => {
  const d = new Date();
  
  return d.toLocaleString("en-US", { timeZone: "America/New_York" });
};

export default GetDate;
