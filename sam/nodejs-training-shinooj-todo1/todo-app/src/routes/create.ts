import { APIGatewayProxyHandler } from 'aws-lambda';
import { addTodo } from '../services/todoService';

export const handleCreateTodo: APIGatewayProxyHandler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    if (!body.note) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing note in request body' })
      };
    }
    const newTodo = addTodo(body.note);
    return {
      statusCode: 201,
      body: JSON.stringify(newTodo)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: (error as Error).message })
    };
  }
};
