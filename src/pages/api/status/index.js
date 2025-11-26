import database from "../../../../infra/database"

async function status(request, response) {
    console.log(database.query("SELECT 1+1 as SUM;"))
    response.status(200).json({"content": "So far, so great!"})
};

export default status;