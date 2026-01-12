const cleanText = (text) => {
    return text
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .toLowerCase();
  };
  
  export default cleanText;
  