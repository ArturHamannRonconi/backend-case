import express from 'express';

function JsonMiddleware() {
  return express.json();
}

export default JsonMiddleware;
