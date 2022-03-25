const request = require("request");
const jssoup = require("jssoup").default;

if (!process.argv[2]) {
  throw "need to provide fund as an arguement `try calling : node index.js BM70SSF`";
}
request(
  {
    uri: "https://codequiz.azurewebsites.net/",
    headers: { Cookie: "hasCookie=true" },
  },
  function (_error, _response, body) {
    const soup = new jssoup(body);
    const symbol = process.argv[2];

    const elems = soup.findAll("td");
    const found = elems.filter((elem) => {
      return elem.text.trim() === symbol;
    });
    console.log(found[0].nextElement.nextElement.getText());
  }
);
