import { APIGatewayProxyHandler } from "aws-lambda";
import { handleCreateTodo } from "./routes/create";
import { handleGetTodo } from "./routes/get";
import { handleUpdateTodo } from "./routes/update";
import { handleDeleteTodo } from "./routes/delete";

function getRouteKey(event : any):string{
  const { httpMethod, path} = event;
  if (httpMethod === "POST" && path === "/todos") return "POST /todos";
  if (httpMethod === "GET" && path === "/todos") return "GET /todos";
  if (httpMethod === "PUT" && /^\/todos\/[\w-]+$/.test(path)) return "PUT /todos/{id}";
  if (httpMethod === "DELETE" && /^\/todos\/[\w-]+$/.test(path)) return "DELETE /todos/{id}";
  if (httpMethod === "POST" && path === "/todos/backup") return "POST /todos/backup";
  return "";
}


export const main: APIGatewayProxyHandler=async (event, context, callback)=>{
const routeKey = getRouteKey(event);
let result;
switch (routeKey) {
    case "POST /todos":
        result = await handleCreateTodo (event, context, callback); break;
    case "GET /todos":
        result = await handleGetTodo (event, context, callback); break;
    case "PUT /todos/{id}":
        result = await handleUpdateTodo (event, context, callback); break;
    case "DELETE /todos/{id}":
        result = await handleDeleteTodo (event, context, callback); break;
    default:
        result = {
        statusCode: 404,
        body: JSON.stringify({ message: "Not Found" }) };
} 

return result || { statusCode: 200, body: "" };
};