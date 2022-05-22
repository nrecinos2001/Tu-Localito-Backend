import { User } from 'src/entities/user.entity';

export function okResponse(data: any) {
  return {
    status: 200,
    data,
  };
}

export function createdResponse(user: User) {
  return {
    status: 201,
    data: user,
  };
}

export function emptyResponse() {
  return {
    status: 204,
    data: {},
  };
}

export function badRequestResponse() {
  return {
    status: 400,
    data: {
      status: 400,
      message: 'Bad Request',
    },
  };
}

export function notAuthorizedMessage() {
  return {
    status: 401,
    data: {
      status: 401,
      message: 'Unauthorized',
    },
  };
}

export function forbiddenMessage() {
  return {
    status: 403,
    data: {
      status: 403,
      message: 'Forbidden',
    },
  };
}

export function notFoundResponse() {
  return {
    status: 404,
    data: {
      status: 404,
      message: 'Not found',
    },
  };
}
