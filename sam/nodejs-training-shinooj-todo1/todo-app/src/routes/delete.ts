import { APIGatewayProxyHandler } from 'aws-lambda';
import { removeTodo } from '../services/todoService';

export const handleDeleteTodo: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters && event.pathParameters.id ? parseInt(event.pathParameters.id, 10) : null;
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing id in request' })
      };
    }
    const removed = removeTodo(id);
    if (!removed) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Todo not found' })
      };
    }
    return {
      statusCode: 204,
      body: ''
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: (error as Error).message })
    };
  }
};
