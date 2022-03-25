const request = require("request");
const jssoup = require("jssoup").default;
const symbol = process.argv[2];

if (!symbol) {
  throw "need to provide fund code as an arguement `try calling : node index.js BM70SSF`";
}
request(
  {
    uri: "https://codequiz.azurewebsites.net/",
    headers: { Cookie: "hasCookie=true" },
  },
  function (_error, _response, body) {
    const soup = new jssoup(body);
    const elems = soup.findAll("td");
    const found = elems.filter((elem) => {
      return elem.text.trim() === symbol;
    });
    if (found.length) {
      console.log(found[0]?.nextElement.nextElement.getText());
    } else {
      console.log(`${symbol} not found please try again with valid fund code`);
    }
  }
);
