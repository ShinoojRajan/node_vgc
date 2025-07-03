import { APIGatewayProxyHandler } from 'aws-lambda';
import { getTodos } from '../services/todoService';

export const handleGetTodo: APIGatewayProxyHandler = async () => {
  try {
    const todos = getTodos();
    return {
      statusCode: 200,
      body: JSON.stringify(todos)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: (error as Error).message })
    };
  }
};
