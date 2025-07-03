import { APIGatewayProxyHandler } from 'aws-lambda';
import { updateTodo } from '../services/todoService';

export const handleUpdateTodo: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters && event.pathParameters.id ? parseInt(event.pathParameters.id, 10) : null;
    const body = event.body ? JSON.parse(event.body) : {};
    if (!id || !body.note) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing id or note in request' })
      };
    }
    const updated = updateTodo(id, body.note);
    if (!updated) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Todo not found' })
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(updated)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: (error as Error).message })
    };
  }
};
