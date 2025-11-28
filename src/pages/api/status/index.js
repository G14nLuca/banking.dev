import database from "../../../../infra/database";

async function status(request, response) {
  response.status(200).json({ content: "So far, so great!" });
}

export default status;
