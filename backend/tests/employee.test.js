const request = require('supertest');
const app = require('../src/app');

describe('Employee API Tests', () => {
  let testEmployeeId;

  // Test GET /api/employees
  test('GET /api/employees should return all employees', async () => {
    const response = await request(app)
      .get('/api/employees')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Test POST /api/employees
  test('POST /api/employees should create a new employee', async () => {
    const employeeData = {
      name: 'Test Employee',
      email: 'test@example.com',
      position: 'Test Position'
    };

    const response = await request(app)
      .post('/api/employees')
      .send(employeeData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(employeeData.name);
    expect(response.body.data.email).toBe(employeeData.email);
    expect(response.body.data.position).toBe(employeeData.position);
    
    testEmployeeId = response.body.data.id;
  });

  // Test validation
  test('POST /api/employees should validate required fields', async () => {
    const invalidData = {
      name: '',
      email: 'invalid-email',
      position: ''
    };

    const response = await request(app)
      .post('/api/employees')
      .send(invalidData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.errors).toBeDefined();
  });

  // Test GET /api/employees/:id
  test('GET /api/employees/:id should return specific employee', async () => {
    const response = await request(app)
      .get(`/api/employees/${testEmployeeId}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(testEmployeeId);
  });

  // Test PUT /api/employees/:id
  test('PUT /api/employees/:id should update employee', async () => {
    const updateData = {
      name: 'Updated Employee',
      email: 'updated@example.com',
      position: 'Updated Position'
    };

    const response = await request(app)
      .put(`/api/employees/${testEmployeeId}`)
      .send(updateData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(updateData.name);
  });

  // Test DELETE /api/employees/:id
  test('DELETE /api/employees/:id should delete employee', async () => {
    const response = await request(app)
      .delete(`/api/employees/${testEmployeeId}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.deletedRows).toBe(1);
  });

  // Test 404 for non-existent employee
  test('GET /api/employees/999 should return 404', async () => {
    const response = await request(app)
      .get('/api/employees/999')
      .expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Employee not found');
  });
});
