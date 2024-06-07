import request from 'supertest'
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';
describe("Todo route testing", () => {
  
  beforeAll(async() =>{
    await testServer.start()
  })

  afterAll(()=>{
    testServer.close()
  })

  beforeEach(async()=>{
    await prisma.todo.deleteMany()
  })

  const todo1 = {text: 'todo 1'}
  const todo2 = {text: 'todo 2'}

  test("should return TODOS api/todos", async() => {
    await prisma.todo.createMany({
      data: [todo1,todo2]
    })

    const {body} = await request(testServer.app)
        .get('/api/todos')
        .expect(200);
     
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    
  });

  test("should return a TODO api/todos/:id", async() => {
    const todo = await prisma.todo.create({
      data: todo1
    })

    const {body} = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);
    
    expect(body).toEqual({
      id: todo.id,
      text: todo.text
    })
  });

  test("should return an ERROR 404 NOT FOUND api/todos/:id", async() => {
    const {body} = await request(testServer.app)
      .get(`/api/todos/999`)
      .expect(404);

    expect(body).toEqual({error: "Todo with id 999 not found"})
  });

  test("should return a new todo /api/todos", async() => {
    const {body} = await request(testServer.app)
      .post(`/api/todos`)
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: expect.any(String)
    })
  });

  test("should return an error if text is not valid /api/todos", async() => {
    const {body} = await request(testServer.app)
      .post(`/api/todos`)
      .send({})
      .expect(400);

    expect(body).toEqual({
      error: "Text property is required"
    })
  });

  test("should return an error if text is empty /api/todos", async() => {
    const {body} = await request(testServer.app)
      .post(`/api/todos`)
      .send({text: ''})
      .expect(400);

    expect(body).toEqual({
      error: "Text property is required"
    })
  });
});
