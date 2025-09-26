import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { employeeAPI } from './services/api';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Modal from './components/Modal';
import SearchBar from './components/SearchBar';
import toast from 'react-hot-toast';

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      toast.error('Failed to fetch employees');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (editingEmployee) {
        // Update existing employee
        await employeeAPI.update(editingEmployee.id, formData);
        toast.success('Employee updated successfully');
      } else {
        // Create new employee
        await employeeAPI.create(formData);
        toast.success('Employee added successfully');
      }
      
      setIsModalOpen(false);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to save employee';
      toast.error(errorMessage);
      console.error('Submit error:', error);
    }
  };

  // Handle edit employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  // Handle add new employee
  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
            <p className="mt-2 text-gray-600">Manage your team members efficiently</p>
          </div>

          {/* Controls */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search employees by name, email, or position..."
              />
            </div>
            <button
              onClick={handleAddEmployee}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Employee
            </button>
          </div>

          {/* Employee List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Employees ({filteredEmployees.length})
              </h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <span className="ml-2 text-gray-600">Loading employees...</span>
                </div>
              ) : (
                <EmployeeList
                  employees={filteredEmployees}
                  onEdit={handleEditEmployee}
                  onDelete={() => {}} // Handled in EmployeeList component
                  onRefresh={fetchEmployees}
                  searchTerm={searchTerm}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
      >
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
          isEditing={!!editingEmployee}
        />
      </Modal>
    </div>
  );
}

export default App;