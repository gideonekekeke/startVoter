import http from "http";

const port: number = 2334;

interface Data {
  success: boolean;
  message: string;
  data: {}[] | null;
}

function GetSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

const sortDATA = (props) => {
  return (a, b) => {
    if (a[props] < b[props]) {
      return 1;
    } else if (a[props] > b[props]) {
      return -1;
    }
    return 0;
  };
};

let mainData = [{ id: 1, name: "Peter" }];

const app = http.createServer((req, res) => {
  res.setHeader("content-type", "application/json");
  const { url, method } = req;

  //   let body = [];
  let body = "";

  req.on("data", (chunk) => {
    // body.push(chunk);
    body += chunk;
  });

  let status = 404;
  let result: Data = {
    message: "fail",
    success: false,
    data: null,
  };

  req.on("end", () => {
    if (url === "/" && method === "GET") {
      status = 200;
      result.message = "got entry";
      result.data = mainData;
      result.success = true;

      res.end(JSON.stringify({ status, result }));
    }

    if (url === "/" && method === "POST") {
      mainData.push(JSON.parse(body));

      status = 201;
      result.message = "new entry created";
      result.data = mainData;
      result.success = true;

      res.end(JSON.stringify({ status, result }));
    }

    if (method === "DELETE") {
      //   mainData.push(JSON.parse(body));
      let getID: string | undefined = url?.split("/")[1];
      let getIDS: number = parseInt(getID!);
      console.log("Delete: ", getIDS);
      if (getIDS) {
        mainData = mainData.filter((el) => el.id !== getIDS);

        status = 201;
        result.message = " entry delete";
        result.data = mainData;
        result.success = true;

        res.end(JSON.stringify({ status, result }));
      } else {
        res.end("No match found");
      }
    }

    if (method === "PATCH") {
      //   mainData.push(JSON.parse(body));
      let getID: string | undefined = url?.split("/")[1];

      let getIDS: number = parseInt(getID!);
      if (getIDS) {
        const { id, name } = JSON.parse(body);
        console.log(mainData[getIDS - 1]);
        // mainData[getIDS].id = id;
        mainData[getIDS - 1].name = name;

        status = 201;
        result.message = " entry delete";
        result.data = mainData;
        result.success = true;

        res.end(JSON.stringify({ status, result }));
      } else {
        res.end("No match");
      }
    }
  });
});

app.listen(port, () => {
  console.log("");
  console.log("Let's do this!");
  console.log("");
});
